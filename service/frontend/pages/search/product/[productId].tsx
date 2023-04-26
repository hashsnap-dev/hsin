import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import DomesticContent, {
  MaterialTag,
} from '@/components/search/product-detail/DomesticContent';
import Link from '@/components/Link';
import { FC, useEffect, useState } from 'react';
import WarningCards from '@/components/search/product-detail/WarningCards';
import useSWR from 'swr';
import {
  IntegrationFoodList,
  Functionalities,
  C003,
  I0030,
  FunctionalityMaterials,
  ForeignFoodDetail,
  ForeignFoodList,
} from 'hsin';
import { dateFormat, useStateByEffect } from '@/helper/utils';
import { UserData, useUserData } from '@/store/user-data';
import SidePanel from '@/components/search/SidePanel';
import foodWarn from '@/helper/food-warn';
import qs from 'qs';
import axios from 'axios';
const ProductDetails: NextPage = () => {
  const { query } = useRouter();

  const productId = query.productId;

  const { data: funcData, error: funcError } =
    useSWR<{ total: number; data: Functionalities[] }>(`/api/functionalities`);
  const { data: foodData, error: foodError } = useSWR<{
    data: IntegrationFoodList;
    detail: I0030 | ForeignFoodList;
  }>(`/api/foods/${productId}`);

  const [userData, setUserData] = useUserData();

  useEffect(() => {
    if (!foodData) return;

    (async () => {
      try {
        let recent = [...userData.recent];
        const deleteIndex = recent.findIndex(
          ({ report_no }) => report_no === productId?.slice(1)
        );
        deleteIndex !== -1 && recent.splice(deleteIndex, 1);
        recent.unshift(foodData.data);
        recent.splice(10);
        recent = recent.filter((i) => i);
        setUserData({
          recent,
        });
      } catch (err) {
        // localforage.removeItem('user-data', () => {});
      }
    })();
  }, [foodData]);

  const [computedFunctionalities] = useStateByEffect(
    () => {
      if (!foodData) return [];
      const f1 = foodData?.data?.functionalities.filter(
        (str) => str[0] === '3'
      );
      const f2 = foodData?.data?.functionalities.filter(
        (str) => str[0] === '2'
      );
      return [...f1, ...f2];
    },
    [foodData],
    []
  );

  const { data: matData, error: matError } = useSWR<FunctionalityMaterials[]>(
    foodData?.data?.materials
      ? `/api/materials/brief/${foodData.data.materials.join(',')}`
      : null
  );
  const [multiFunctionalities] = useStateByEffect(
    () =>
      matData?.some(({ functionality }) => functionality.length > 1) ?? false,
    [matData],
    false
  );

  const [computedMatData] = useStateByEffect(
    () => {
      const nonNutrientMats =
        matData?.filter(({ type }) => type !== '고시형원료-영양소') ?? [];
      const nutrientMats =
        matData?.filter(({ type }) => type === '고시형원료-영양소') ?? [];
      return [...nonNutrientMats, ...nutrientMats];
    },
    [matData],
    [] as FunctionalityMaterials[]
  );

  const { data: eatData, error: eatError } = useSWR<string[]>(
    foodData?.data?.materials
      ? `/api/materials/eat-together/${foodData.data.materials.join(',')}`
      : null
  );
  const [eatTogether] = useStateByEffect(() => eatData, [eatData], []);

  const computeFunctionalities = (funcs: string[]) => {
    if (!funcData || !funcs) return [];
    const { data } = funcData;
    return funcs.map((func) => {
      return data?.find(({ id }) => func === id)?.functionality ?? '';
    });
  };

  const toggleHeart = async () => {
    try {
      const heart = [...userData.heart];
      const deleteIndex = heart.findIndex(
        ({ report_no }) => report_no === productId?.slice(1)
      );

      if (deleteIndex === -1) {
        foodData && heart.push(foodData.data);
        axios.post(`/api/foods/${productId}`);
      } else {
        heart.splice(deleteIndex, 1);
      }
      setUserData({
        heart,
      });
    } catch (err: any) {}
  };

  const relationParams = qs.stringify({
    // https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters
    _sort: 'created_at:DESC',
    _limit: 5,
    _where: {
      _or: [
        [
          {
            _or:
              foodData?.data.functionalities.map((no) => ({
                'tags.name': no,
              })) ?? [],
          },
          { 'tags.type': 'functionality' },
        ],
        [
          {
            _or:
              foodData?.data.materials.map((no) => ({ 'tags.name': no })) ?? [],
          },
          { 'tags.type': 'material' },
        ],
      ],
    },
  });

  const { data: board, error: boardError } = useSWR(
    foodData ? `/board/information-posts?${relationParams}` : null
  );

  const {
    type,
    report_no,
    company,
    name,
    thumbnail,
    thumbnails,
    url,
    functionalities,
    warn,
  } = foodData?.data ?? {};

  const {
    domestic: {
      PRMS_DT,
      POG_DAYCNT,
      DISPOS,
      NTK_MTHD,
      FRMLC_MTRQLT,
      CSTDY_MTHD,
      IFTKN_ATNT_MATR_CN,
      PRIMARY_FNCLTY,
      STDR_STND,
      RAWMTRL_NM,
      ETC_RAWMTRL_NM,
      CAP_RAWMTRL_NM,
    },
    foreign: {
      list: { bsnOfcName, prductKoreanNm },
      detail: {
        foodDetailInfo: {
          expirdeBeginDtm,
          expirdeEndDtm,
          mnfNtnnm,
          xportNtnnm,
          procsDtm,
        },
        itmList,
        irdntList,
      },
    },
  } = (foodData as any) ?? {
    domestic: {},
    foreign: {
      list: {},
      detail: {
        foodDetailInfo: {},
      },
    },
  };

  const label =
    type === 'domestic'
      ? '국내 제품'
      : type === 'foreign'
      ? '수입 제품'
      : (null as never);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <SidePanel />
        <Spacer size={64} mobileSize={20} />
        <SectionTitle className="desktop" label={label} emphasis />
        <SectionTitle className="mobile" label={label} />
        <DomesticContent className="font-notosans">
          <div className="header">
            <div
              className="thumbnail"
              style={{
                backgroundImage: `url(${
                  thumbnails?.length
                    ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/saved/${report_no}/${thumbnails[0]}`
                    : ''
                }), url(${
                  thumbnails?.length
                    ? ''
                    : '/assets/HSIN_IMG_Noresult_540x250.svg'
                })`,
              }}
            >
              {!thumbnails?.length && '이미지 준비중입니다.'}
            </div>
            <Spacer size={64} mobileSize={20} />
            <div className="content">
              <div className="sub-header">
                <div className="title">
                  {type === 'domestic' && <h2>{company}</h2>}
                  {type === 'foreign' && <h2>{bsnOfcName}</h2>}
                  {type === 'domestic' && <h1>{name}</h1>}
                  {type === 'foreign' && <h1>{prductKoreanNm}</h1>}
                  {type === 'foreign' && <h3>{name}</h3>}
                </div>
                {url && (
                  <button
                    className="more"
                    onClick={() => window.open(url, '_blank')}
                  >
                    정보 더 보기
                  </button>
                )}

                <button
                  className={
                    userData.heart.find(
                      ({ report_no }) => report_no === productId?.slice(1)
                    )
                      ? 'hearted'
                      : ''
                  }
                  onClick={toggleHeart}
                >
                  찜하기
                </button>
              </div>
              <div className="brief1">
                <div className="functionalities">
                  <h4>기능성 내용</h4>
                  {computeFunctionalities(computedFunctionalities ?? [])
                    .slice(0, 2)
                    .map((str, i) => (
                      <p key={`funcionality-${i}`}>{str}</p>
                    ))}
                  {computedFunctionalities.length > 1 && <button>More</button>}
                  {multiFunctionalities && (
                    <p className="multi-functionalities">
                      기능성별 함량 기준은 상세 내용을 참고하세요.
                    </p>
                  )}
                </div>
                <Spacer size={31} mobileSize={24} />
                <div className="materials">
                  <h4>기능성 원료</h4>
                  {computedMatData.map(({ name, no }, i) => (
                    <Link
                      href={`/search/raw_material/${no[0]}`}
                      key={`material-${i}`}
                    >
                      <MaterialTag>{name?.trim()}</MaterialTag>
                    </Link>
                  ))}
                </div>
              </div>
              {warn && warn.length !== 0 && (
                <div className="brief2">
                  <h4>제품 섭취 시 주의사항</h4>
                  <WarningCards
                    data={
                      warn?.map((str) => ({
                        icon: `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/warns/HSIN_Icon_caution_64x64-${str.padStart(
                          2,
                          '0'
                        )}.svg`,
                        label: (foodWarn as any)[str],
                      })) ?? []
                    }
                  />
                </div>
              )}
              <div className="c1">
                <Link
                  href={`/search/product?functionalities=${
                    functionalities?.join(',') ?? ''
                  }`}
                >
                  <button className="b1">
                    동일 기능성 제품군 보기
                    <span className="icon" />
                  </button>
                </Link>
                <Spacer size={4} />
                {eatTogether?.length ? (
                  <Link
                    href={`/search/concomitant_use/${eatTogether.join(',')}`}
                  >
                    <button className="b2">
                      의약품 병용 섭취 주의사항 보기
                      <span className="icon" />
                    </button>
                  </Link>
                ) : (
                  <button className="b2">
                    의약품 병용 섭취 주의사항이 없습니다.
                    <span className="icon" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <Spacer size={20} />
          <div className="content">
            <h4>상세정보</h4>
            <dl>
              <dt>제조사명</dt>
              <dd>{company}</dd>
              <dt>제품명</dt>
              <dd>{name}</dd>
              {type === 'domestic' && (
                <>
                  <dt>신고번호</dt>
                  <dd>{report_no}</dd>
                  <dt>등록일자</dt>
                  <dd>{PRMS_DT || '-'}</dd>
                  <dt>유통기한</dt>
                  <dd>{POG_DAYCNT || '-'}</dd>
                  <dt>성상</dt>
                  <dd>{DISPOS || '-'}</dd>
                  <dt>섭취량/섭취 방법</dt>
                  <dd>{NTK_MTHD || '-'}</dd>
                  <dt>포장재질(방법)</dt>
                  <dd>{FRMLC_MTRQLT || '-'}</dd>
                  <dt>보존 및 유통기준</dt>
                  <dd>{CSTDY_MTHD || '-'}</dd>
                  <dt>섭취 시 주의사항</dt>
                  <dd>{IFTKN_ATNT_MATR_CN || '-'}</dd>
                  <dt>기능성 내용</dt>
                  <dd>{PRIMARY_FNCLTY || '-'}</dd>
                  <dt>기준 및 규격</dt>
                  <dd>{STDR_STND || '-'}</dd>
                  <dt>기능성 원료</dt>
                  <dd>
                    {RAWMTRL_NM?.split(',').map((str: string, i: number) => (
                      <p key={`m1-${i}`}>{str?.trim()}</p>
                    )) ?? '-'}
                  </dd>
                  <dt>기타 원료</dt>
                  <dd>
                    {ETC_RAWMTRL_NM?.split(',').map(
                      (str: string, i: number) => (
                        <p key={`m2-${i}`}>{str?.trim()}</p>
                      )
                    ) ?? '-'}
                  </dd>
                  <dt>캡슐 원료</dt>
                  <dd>
                    {CAP_RAWMTRL_NM?.split(',').map(
                      (str: string, i: number) => (
                        <p key={`m3${i}`}>{str?.trim()}</p>
                      )
                    ) ?? '-'}
                  </dd>
                </>
              )}
              {type === 'foreign' && (
                <>
                  <dt>수입업체</dt>
                  <dd>{bsnOfcName || '-'}</dd>
                  <dt>제조국/수출국</dt>
                  <dd>
                    {mnfNtnnm}/{xportNtnnm}
                  </dd>
                  <dt>신고필증발급일자</dt>
                  <dd>{procsDtm || '-'}</dd>
                  <dt>유통기한</dt>
                  <dd>
                    {expirdeBeginDtm} ~ {expirdeEndDtm}
                  </dd>
                  <dt>기능성 내용</dt>
                  <dd>
                    {computeFunctionalities(functionalities ?? []).length
                      ? computeFunctionalities(functionalities ?? []).map(
                          (str, i) => <p key={`func-details-${i}`}>{str}</p>
                        )
                      : '-'}
                  </dd>
                  <dt>섭취시 주의사항</dt>
                  <dd>
                    {warn?.map((id, i) => (
                      <p key={`warn-details-${i}`}>{(foodWarn as any)[id]}</p>
                    )) ?? '-'}
                  </dd>
                  <dt>기능성 원료</dt>
                  <dd>
                    {itmList.length
                      ? itmList.map(
                          ({ itmNm }: { itmNm: string }, i: number) => (
                            <p key={`m1-${i}`}>{itmNm}</p>
                          )
                        )
                      : '-'}
                  </dd>
                  <dt>기타 원료</dt>
                  <dd>
                    {irdntList.length
                      ? irdntList.map(
                          ({ koreanNm }: { koreanNm: string }, i: number) => (
                            <p key={`m2-${i}`}>{koreanNm}</p>
                          )
                        )
                      : '-'}
                  </dd>
                </>
              )}
            </dl>

            {url && (
              <Link href={url || ''} target="blank" className="goto-more">
                정보 더보기
              </Link>
            )}

            {board && board?.length ? (
              <div className="articles">
                {board.map(({ title, created_at, id }: any) => (
                  <Link
                    href={`/information/post/${id}`}
                    target="_blank"
                    key={`article-${id}`}
                  >
                    {title} <time>{dateFormat(created_at)}</time>
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              className="goto-list"
              href={`/search/product${globalThis.location?.search}`}
            >
              목록
            </Link>
          </div>
        </DomesticContent>
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default ProductDetails;
