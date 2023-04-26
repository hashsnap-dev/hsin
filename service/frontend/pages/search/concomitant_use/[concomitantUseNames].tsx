import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import { Column, Item, Row } from '@/layouts/flex-utils';
import Link from '@/components/Link';
import Content from '@/components/search/concomitant_use-detail/Content';
import MoveButton from '@/components/MoveButton';
import { useQuery } from '@/helper/utils';
import useSWR from 'swr';

const ConcomitantUseDetail: NextPage = () => {
  const { query } = useRouter();
  const { page, limit, total } = useQuery();
  const { data, error } = useSWR(
    `/api/eat-together?names=${encodeURI(query.concomitantUseNames as string)}`
  );

  const items = data?.data;

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle
          className="desktop"
          label="의약품 병용 섭취 정보"
          emphasis
        />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          {items &&
            items.map(
              ({ _id, name, name_eng, thumbnail, descriptions }: any) => (
                <div key={`concomitant-use-detail-${name}`}>
                  <Spacer size={40} mobileSize={40} />
                  <Row className="layout">
                    <Column className="header">
                      <div
                        className="icon"
                        style={{
                          // backgroundImage: `url(/assets/icon_functionality_physiology_1.svg)`,
                          backgroundImage: `url('https://health-functional-food.s3.ap-northeast-2.amazonaws.com/concomitant_use/${name.replace(
                            /\//g,
                            '_'
                          )}.svg')`,
                        }}
                      />
                      <h1>{name}</h1>
                      <h2>{name_eng}</h2>
                    </Column>
                    <Spacer size={94} mobileSize={64} />
                    <Column className="content">
                      {descriptions.map(
                        ({ body, title, medicines }: any, i: number) => (
                          <div
                            key={`concomitant-use-detail-${name}-description-${i}`}
                          >
                            <div className="description">
                              <Row
                                className="title font-nanumsquare"
                                alignItems="center"
                                justifyContent="start"
                              >
                                <div className="no">
                                  {(i + 1 + '').padStart(2, '0')}
                                </div>
                                <div className="hr" />
                                <h4>{body}</h4>
                              </Row>
                              {medicines.length ? (
                                <div className="medicines">
                                  <table>
                                    {title && <caption>{title}</caption>}
                                    <thead>
                                      <tr>
                                        <th>의약품 성분</th>
                                        <th>제품명</th>
                                        <th>분 류</th>
                                        <th>전문/일반의약품</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {medicines.map(
                                        (
                                          {
                                            category,
                                            ingredient,
                                            names,
                                            type,
                                          }: any,
                                          j: number
                                        ) => (
                                          <tr
                                            key={`concomitant-use-detail-${name}-medicines-${j}`}
                                          >
                                            <td>{ingredient}</td>
                                            <td>{names}</td>
                                            <td>{category}</td>
                                            <td>{type}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )
                      )}
                    </Column>
                  </Row>
                </div>
              )
            )}
          <Spacer size={64} />
          <img
            className="bottom-image desktop"
            src="/assets/image_concomitant_use_i1.svg"
          />
          <img
            className="bottom-image mobile"
            src="/assets/image_concomitant_use_i2.svg"
          />
          <Row className="goto" justifyContent="end">
            <MoveButton
              href={`/search/concomitant_use${globalThis.location?.search}`}
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

export default ConcomitantUseDetail;
