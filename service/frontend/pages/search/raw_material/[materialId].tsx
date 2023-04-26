import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FunctionalityMaterials } from 'hsin';
import MaterialContent from '@/components/search/raw_material-detail/MaterialContent';
import { Item, Row } from '@/layouts/flex-utils';
import Link from '@/components/Link';
import MoveButton from '@/components/MoveButton';
import useSWR from 'swr';
import Script from 'next/script';
import Markdownit from '@/components/Markdownit';
import { useStateByEffect } from '@/helper/utils';

const mockData: FunctionalityMaterials = {
  no: ['1'],
  name: '복분자 추출물(RE-20)',
  type: '개별인정원료',
  company: '(주)비엔텍',
  functionality: [],
  amount: '',
  warn: [],
  abolished: false,
  canceled: false,
  eatTogether: '',
  description: '',
  requirements: '',
};

const mockContent = `
1) 제조기준
  (1) 원재료 : 알로에(Aloe vera, Aloe arborescence, Aloe saponaria)의 잎
  (2) 제조방법
    (가) 상기 (1)의 원재료에서 비가식 부분을 제거한 후 건조, 분말화하여 제조하여야 함
    (나) 상기 (1)의 원재료에서 비가식 부분을 제거한 후 분쇄 또는 농축하여 제조하여야 함
  (3) 기능성분(또는 지표성분)의 함량 : 안트라퀴논계화합물(무수바바로인으로서)을 2.0 mg/g 이상 함유하고 있어야 함

2) 최종제품의 요건
  (1) 기능성 내용 : 배변활동 원활에 도움을 줄 수 있음
  (2) 일일섭취량 : 무수바바로인으로서 20～30 mg
  (3) 섭취 시 주의사항
    (가) 어린이, 임산부 및 수유부는 섭취를 피할 것
    (나) 위·신장·간질환이 있거나 의약품 복용 시 전문가와 상담할 것
    (다) 이상사례 발생 시 섭취를 중단하고 전문가와 상담할 것
`.trim();

const getPreventPDFName = (str: string) => {
  return str?.replace(/ /g, '').replace(/\(.+?\)/g, '') ?? '';
};

const RawMaterial: NextPage = () => {
  const { query } = useRouter();

  const { data: matData, error: matError } = useSWR<{
    total: number;
    data: FunctionalityMaterials;
  }>(`/api/materials/${query.materialId}`);

  const { data: fileHead, error: fileError } = useSWR(
    matData && matData.data
      ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/docs/${matData?.data.no[0]}.pdf`
      : null,
    (url) => fetch(url, { method: 'HEAD' })
  );
  const [url] = useStateByEffect(
    () => {
      return fileHead?.status === 200
        ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/docs/${matData?.data.no[0]}.pdf`
        : '';
    },
    [fileHead, fileHead?.status],
    ''
  );

  const { data: preventFileHead, error: preventFileError } = useSWR(
    matData?.data?.type === '사용불가원료'
      ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/docs/prevent-materials/${getPreventPDFName(
          matData?.data.name
        )}.pdf`
      : null,
    (url) => fetch(url, { method: 'HEAD' })
  );
  const { data: preventMaterial, error: preventMaterialError } = useSWR<
    { title: string; content: string }[]
  >(
    matData?.data?.type === '사용불가원료'
      ? `https://cms.hsinportal.co.kr/search-raw-materials-not-availables?title=${encodeURIComponent(
          (query.materialId as string).replace(/_/g, ' ')
        )}`
      : null
  );

  const {
    type,
    name,
    description,
    requirements,
    no,
    eatTogether,
    abolished,
    canceled,
  } = matData?.data ?? {};

  const computedDescription = () => {
    if (Array.isArray(description)) {
      return description.map(({ value, superscript }) => {
        return superscript ? (
          <sup className="font-notosans">{value}</sup>
        ) : (
          value
          // .replace(/[\n\t\r]{2,}/g, '\n')
        );
      });
    } else return description;
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="원료 검색" emphasis />
        <MaterialContent>
          <Row className="header" alignItems="end">
            <Item flex={1}>
              <h2>
                {type}
                {abolished && <span>인정폐지</span>}
                {canceled && <span>인정취소</span>}
              </h2>
              <h1>{name}</h1>
            </Item>
            <Row className="extra">
              {url && (
                <Link href={url} target="_blank">
                  {type === '개별인정원료'
                    ? '소비자 리포트 상세보기'
                    : '공전 상세보기'}
                </Link>
              )}
            </Row>
          </Row>
          <div className="content">
            {type !== '개별인정원료' && description && <h4>1) 제조기준</h4>}
            <pre className="font-notosans depth-1">{computedDescription()}</pre>
            {requirements && <h4>2) 최종제품의 요건</h4>}
            {requirements?.split('\n').map((str, i) => {
              return /^[^ ]/.test(str) ? (
                <p className="depth-1" key={`content-string-${i}`}>
                  {str}
                </p>
              ) : /^  [^ ]/.test(str) ? (
                <p className="depth-2" key={`content-string-${i}`}>
                  {str}
                </p>
              ) : /^    [^ ]/.test(str) ? (
                <p className="depth-3" key={`content-string-${i}`}>
                  {str}
                </p>
              ) : /^      [^ ]/.test(str) ? (
                <p className="depth-4" key={`content-string-${i}`}>
                  {str}
                </p>
              ) : null;
            })}
            <Spacer size={16} />
            <Row className="shortcut">
              {matData?.data?.type !== '사용불가원료' && (
                <Link
                  href={`/search/product?materials=${encodeURI(
                    encodeURIComponent(name ?? '')
                  )}`}
                >
                  관련 제품 보기
                </Link>
              )}
              {eatTogether && (
                <Link href={`/search/concomitant_use/${eatTogether}`}>
                  의약품 병용 섭취 주의사항 보기
                </Link>
              )}
              {preventMaterial?.[0] && (
                <div>
                  <Markdownit text={preventMaterial?.[0]?.content} />
                  <Spacer size={16} />
                  {preventFileHead?.status === 200 && (
                    <Link href={preventFileHead.url} target="_blank">
                      세부정보 보기
                    </Link>
                  )}
                </div>
              )}
            </Row>
            <Row className="goto" justifyContent="space-between">
              <Row className="hidden">
                <MoveButton href="/" disabled={true}>
                  이전
                </MoveButton>
                <Spacer size={4} mobileSize={0} />
                <MoveButton href="/" disabled={false}>
                  다음
                </MoveButton>
              </Row>
              <MoveButton
                href={`/search/raw_material${
                  globalThis.location?.search ?? ''
                }`}
                primary
              >
                목록
              </MoveButton>
            </Row>
            <Spacer size={180} mobileSize={100} />
          </div>
        </MaterialContent>
      </ContentSection>
      <ContentSection className={`font-notosans`}></ContentSection>
      <Footer />
    </>
  );
};

export default RawMaterial;
