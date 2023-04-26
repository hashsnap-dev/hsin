import ContentSection from '@/components/ContentSection';
import Content from '@/components/hsin/DetailContent';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import type { NextPage } from 'next';
import { Column, Row } from '@/layouts/flex-utils';
import { dateFormat, useQuery } from '@/helper/utils';
import MoveButton from '@/components/MoveButton';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Script from 'next/script';
import Markdownit from '@/components/Markdownit';

const SIZE_OPTIONS = [
  { value: 10, label: '10개씩' },
  { value: 30, label: '30개씩' },
  { value: 50, label: '50개씩' },
  { value: 100, label: '100개씩' },
];

const NewsDetail: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { newsId } = query;

  const { data, error } = useSWR(newsId && `/board/news-data/${newsId}`);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="뉴스자료" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <div className="header">
            <h1 className="font-nanumsquare">{data?.title}</h1>
            <Row justifyContent="center">
              <span className="views">조회수 {data?.views}</span>
              <span className="date">{dateFormat(data?.created_at)}</span>
            </Row>
          </div>
          <Markdownit
            className="content"
            style={{ textAlign: 'left' }}
            text={data?.content}
          />
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
              href={`/hsin/news${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </Row>
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default NewsDetail;

/* <p>◈ 식품의약품안전처(처장 김강립)는 수입 김치 등의 안전성 확보를 위해 강화된 수입식품 통관 및 유통 단계 검사를 3월 12일부터 5월 7일까지 실시한 결과, 일부 배추김치‧절임배추‧김치원재료 제품 등의 부적합을 확인하고 부적합이 2회 이상 발생한 5개 해외제조업소 김치를 검사명령 대상 품목으로 지정하고 5월 17일부터 최초 수입되는 모든 김치에 대해 정밀검사 항목 외에도 여시니엔테로콜리티카(이하 여시니아)를 추가하는 등 후속조치 방안을 발표했습니다.</p>
        <p>* 여시니아엔테로콜리티카 : 물 또는 토양 등 자연환경에 널리 존재하고, 0～5℃의 저온에서도 발육 가능한 식중독균으로 주요 증상으로 설사, 복통, 두통 등이 있음</p>
<p></p>
        <p>{'<<'} 수입김치 및 원재료 검사 결과 {'>>'}</p>
        <p>◈ (통관단계 검사 결과) 검사 강화 기간 동안 수입 신고된 중국산 김치 289개 제품(55개 제조업소)에 대해 보존료, 타르색소, 식중독균인 여시니아 등 5개 항목*을 검사했으며,그 결과 15개 제품(11개 제조업소)이 여시니아 검출로 부적합했습니다.</p>
        <p>* 장출혈성 대장균, 여시니아엔테로콜리티카, 보존료, 타르색소, 사이클라메이트</p>
<p></p>
        <p>- 같은 기간 동안 수입 신고돼 5개 항목*을 검사한 중국산 절임배추** 4개 제품(2개 제조업소) 중 2개 제품(1개 제조업소)에서는 허용되지 않은 보존료가 검출돼 부적합했습니다.</p>
        <p>* 장출혈성 대장균, 여시니아엔테로콜리티카, 보존료, 대장균(대장균군), 이산화황 </p>
        <p>** 김치 제조용 절임배추가 아니라 배추에 식염, 식품첨가물 등을 첨가해 제조한 가공식품</p>
        <p>- 부적합 제품 정보를 수입식품정보마루에 공개하고, 반송 또는 폐기토록 했으며, 동일제품 수입신고 시 정밀검사를 5회 연속 실시하고 있으며 수출국 정부에 통보해 개선을 요청했습니다.</p>
<p></p>
        <p>◈ (유통단계 검사 결과) 국내 유통되고 있는 수입김치 30개 제품과 김치 원재료(고춧가루, 다진 마늘 등) 120개 제품을 수거·검사한 결과 냉동 다진 마늘 1건에서 세균수 기준을 초과했습니다.</p>
        <p>* (기준)n=5, c=2, m=10만, M=50만 (결과)21만, 20만, 22만, 25만, 18만</p>
<p></p>
        <p>-  부적합 제품 회수·폐기 정보를 수입식품정보마루에 공개하고 영업자 행정처분을 진행 중이며, 향후 동일제품이 수입신고되면 정밀검사를 5회 연속 실시토록 조치했습니다.</p>
<p></p>
<p></p>
        <p>{'<<'} 수입김치 안전관리를 위한 전문가 의견 수렴 {'>>'}</p>
        <p>◈ 식약처는 수입김치에서 식중독균인 여시니아가 검출된 원인과 향후 조치방안 등에 대한 전문가 의견을 수렴하기 위해 소비자단체, 학계, 업계 전문가들로 이뤄진 자문회의를 지난 5월 11일 개최했습니다.</p>
<p></p>
        <p>- 전문가들은 여시니아가 토양, 물 등 자연환경으로부터 오염될 수 있으므로, 제조과정의 위생관리가 미흡함에 따라 남아있던 여시니아가 검출됐을 것으로 판단했습니다.</p>
        <p>-  또한 수입 김치에서 여시니아가 검출되지 않도록 제조공장의 용수 관리, 원‧부재료 세척 등 철저한 위생관리가 무엇보다 중요하다고 조언했습니다.</p>
<p></p>
<p></p>
        <p>{'<<'} 통관단계 검사명령제 확대 및 유통단계 실태조사 추진 {'>>'}</p>
        <p>◈ 식약처는 상기 부적합 제품에 대한 공통된 조치에 더해 4월 15일 발표한 ‘수입김치 안전‧안심 대책’과 전문가 자문에 따라 통관단계에서 여시니아 부적합이 2회 이상 발생한 5개 해외 제조업소 김치를 검사명령 대상 품목으로 지정, 6월 1일부터 시행할 계획입니다.</p>
<p></p>
        <p>※ 검사명령 : ｢수입식품안전관리 특별법｣ 제22조에 따라 수입식품 중 부적합률이 높거나 국내‧외에서 위해발생 우려가 제기된 식품에 대해 수입자가 식약처장이지정한 시험검사기관에서 정밀검사를 받아 적합한 경우만 수입신고토록 하는 제도</p>
        <p>☞ 현재, 크릴어유, 보리새싹 함유 제품 등 15품목 운영</p>
<p></p>
        <p>◈ 또한 5월 17일부터 국내 최초로 수입되는 모든 김치에 대해 정밀검사 항목* 외에 여시니아를 추가 항목으로 검사합니다.</p>
        <p>* 최초 수입 정밀검사항목: 납, 카드뮴, 보존료, 타르색소, 사이클라메이트, 대장균(살균제품), 여시니아엔테로콜리티카(추가)</p>
        <p>-  5월부터 11월까지 소비자단체협의회와 함께 국내 유통되는 수입김치의 유통경로 조사, 유통단계별 위생실태 조사(보관창고 등 1,000개소), 안전성 확인을 </p>
        <p>    위한구매·검사(김치 등 250개 제품)를 실시해 유통단계에서의 안전을 확인할 계획입니다.</p>
        <p>-  식약처는 부적합 수입김치가 국내에 반입되지 않도록 통관 차단을 철저히 하고 수입신고 전 검사명령, 통관단계 정밀검사, 유통단계 수거검사 등 수입 김치에</p>
        <p>  대한상시 검사체계를 구축해 안전한 김치가 수입ㆍ유통될 수 있도록 최선의 노력을 다하겠습니다. </p>
<p></p>
        <p>◈ 참고로, 통관단계 부적합 수입식품에 대한 상세 정보사항은 수입식품정보마루(impfood.mfds.go.kr → 안전정보 → 수입식품부적합)를 통해 확인이 가능합니다.</p> */
