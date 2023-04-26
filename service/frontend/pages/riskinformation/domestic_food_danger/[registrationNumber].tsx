import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import { Column, Item, Row } from '@/layouts/flex-utils';
import Link from '@/components/Link';
import Content from '@/components/riskinformation/domestic_food_danger-detail/Content';
import MoveButton from '@/components/MoveButton';
import { useQuery } from '@/helper/utils';
import useSWR from 'swr';
import { StopSelling } from 'hsin';
import { useState } from 'react';

const DomesticFoodDangerDetail: NextPage = () => {
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const { query } = useRouter();
  const { page, limit, total } = useQuery();
  const { data, error } = useSWR<{ total: number; data: StopSelling }>(
    `/api/stop-selling/${query.registrationNumber}`
  );
  const item = data?.data ?? ({} as StopSelling);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle
          className="desktop"
          label="회수 판매 중지 제품 정보"
          emphasis
        />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <Spacer size={64} mobileSize={16} />
          <Row className="header">
            <Row className="thumbnail-container">
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url(${item.thumbnails?.[thumbnailIndex]})`,
                }}
              />
              <Column className="thumbnail-change">
                {item.thumbnails?.map((url, i) => {
                  return (
                    <button
                      key={url}
                      className={thumbnailIndex === i ? 'current' : ''}
                      style={{
                        backgroundImage: `url(${url})`,
                      }}
                      onClick={() => setThumbnailIndex(i)}
                    />
                  );
                })}
              </Column>
            </Row>
            <div className="content">
              <h2>{item.company}</h2>
              <h1>{item.name}</h1>
              <h3>회수정보</h3>
              <div className="box">
                <dl>
                  <dt>회수등급</dt>
                  <dd>{item.level}</dd>
                  <dt>회수사유</dt>
                  <dd>{item.reason}</dd>
                </dl>
              </div>
              <h3>
                회수대상제품 확인방법 <span>제품 포장의 표시사항 확인</span>
              </h3>
              <div className="box">
                <dl>
                  <dt>제조일자</dt>
                  <dd>-</dd>
                  <dt>유통기한</dt>
                  <dd>{item.expirationDate ?? '-'}</dd>
                  <dt>영업등록번호</dt>
                  <dd>{item.registrationNumber ?? '-'}</dd>
                  <dt>영업자주소</dt>
                  <dd>{item.address ?? '-'}</dd>
                  <dt>바코드번호</dt>
                  <dd>{item.barcode ?? '-'}</dd>
                  <dt>포장단위</dt>
                  <dd>{item.unit ?? '-'}</dd>
                </dl>
              </div>
            </div>
          </Row>
          <div className="content">
            <h4>소비자가 취해야 하는 행동</h4>
            <p>{item.howToRespond}</p>
            <h4>자세한 정보를 원하시는 경우</h4>
            {item.details
              ?.split('\n')
              .filter((i) => i)
              .map((str, i) => <p key={`details-${i}`}>{str}</p>) ?? ''}
            {/* <p><b>식품안전나라</b> ( www.foodsafetykorea.go.kr )  <b>행복드림 열린소비자포털</b> ( www.consumer.go.kr )</p>
            <p>* 수입식품등 수입·판매업인 ‘(주)세드러스코리아’에서 수입·판매한 {`'`}디라고 프로바이오틱스(유형: 프로바이오틱스){`'`} 제품이 프로바이오틱스 수가</p>
            <p>표시량 대비 부족하여 판매 중단 및 회수 조치중이며, 회수 대상은 유통기한이 2022년 9월 1일인 제품입니다.</p>
            <p>* 당해 회수식품을 보관하고 있는 판매자는 판매를 중단하고, 회수 영업자에게 반품하여 주시기 바랍니다.</p>
            <p>* 동제품을 구입한 소비자(거래처)께서는 그 구입한 업소에 되돌려 주시는 등 위해식품 회수에 적극 협조하여 주시기 바랍니다.</p> */}

            <strong>
              ※ 이들 정보를 사용한 데 따르는 문제에 대한 모든 책임은 사용자에게
              있습니다.
            </strong>
          </div>
          <Row className="goto" justifyContent="end">
            <MoveButton
              href={`/riskinformation/domestic_food_danger${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </Row>
          <Spacer size={180} mobileSize={100} />
        </Content>
      </ContentSection>
      <Footer />
    </>
  );
};

export default DomesticFoodDangerDetail;
