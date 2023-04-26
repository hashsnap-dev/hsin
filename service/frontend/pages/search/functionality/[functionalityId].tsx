import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import { Column, Item, Row } from '@/layouts/flex-utils';
import Link from '@/components/Link';
import FunctionalityDetail from '@/components/search/functionality-detail/FunctionalityDetail';
import MoveButton from '@/components/MoveButton';
import useSWR from 'swr';
import { Functionalities } from 'hsin';

const Functionality: NextPage = () => {
  const { query } = useRouter();
  const { functionalityId } = query;
  const page = query.page || '1';
  const total = 3000;
  const limit = 12;

  const { data, error } = useSWR<{ total: number; data: Functionalities }>(
    `/api/functionalities/${functionalityId}`
  );
  const item = data?.data ?? ({} as Functionalities);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="기능성 검색" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <FunctionalityDetail>
          <Spacer size={40} mobileSize={40} />
          <Row className="layout">
            <Column className="header">
              <div
                className="icon"
                style={
                  item?.id
                    ? {
                        backgroundImage: `url(https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-${item.id
                          .split('-')
                          .pop()
                          ?.padStart(2, '0')}.svg)`,
                      }
                    : {}
                }
              />
              <h2>{item?.type}</h2>
              <h1>{item?.functionality}</h1>
              <Link href={`/search/product?functionalities=${item?.id}`}>
                관련 제품 보기
              </Link>
              <Link href={`/search/raw_material?functionalities=${item?.id}`}>
                관련 원료 보기
              </Link>
            </Column>
            <Spacer size={94} mobileSize={64} />
            <Column className="content">
              {item?.content?.map(([title, body], i) => {
                return (
                  <div key={`content-${i}`}>
                    <h4>{title}</h4>
                    <p style={{whiteSpace: 'pre-line'}}>{body}</p>
                  </div>
                );
              })}
              {!item?.content?.length && (
                <div className="empty">관련 내용을 준비중입니다.</div>
              )}
            </Column>
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
              href={`/search/functionality${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </Row>
        </FunctionalityDetail>
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default Functionality;
