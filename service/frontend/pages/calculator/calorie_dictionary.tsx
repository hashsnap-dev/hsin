import {
  EatTogether,
  StopSelling,
  ForeignBlockFoodList,
  FalseAdvertising,
  I2790,
} from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content from '@/components/calculator/calorie_dictionary/Content';
import SearchPanel from '@/components/SearchPanel';
import SectionTitle from '@/components/SectionTitle';
import {
  fillEmpty,
  firstLetterUpperCase,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import type { NextPage } from 'next';
import useSWR from 'swr';
import FlexGrid from '@/components/FlexGrid';
import Pagination from '@/components/Pagination';
import { Item, Row } from '@/layouts/flex-utils';
import Link from '@/components/Link';
import { useRouter } from 'next/router';
import EmptyResult from '@/components/EmptyResult';

const data: any = [
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
  {
    no: 1,
    category: '곡류 및 그 제품',
    name: '고량미,알곡',
    calorie: 349,
  },
];

const CalorieDictionary: NextPage = () => {
  const { page } = useQuery();
  const router = useRouter();
  const { query } = router;
  const [search, setSearch] = useStateByEffect(
    () => query.query,
    [query.query],
    ''
  );

  const paramsObj = {
    page: page || 1,
    query: query.query,
  };
  const params = obj2params(paramsObj);

  const { data, error } = useSWR<{ total: number; data: I2790[] }>(
    `/api/calorie-dictionary?${params}`
  );
  const { data: count, error: countError } = useSWR<number>(
    `/api/calorie-dictionary/count?${params}`
  );
  const total = count ?? 0;

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
        query: search,
      })}`
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="칼로리 사전" emphasis />
      </ContentSection>
      <Spacer size={16} mobileSize={0} />
      <SearchPanel
        value={search as string}
        onChange={setSearch}
        onSubmit={searchHandler}
      />
      <ContentSection className={`font-notosans`}>
        <Spacer size={40} mobileSize={24} />
        <SectionTitle className="" label="검색결과" />
        <Content>
          <div className="header">
            <Row className="row">
              <Item className="no">번호</Item>
              <Item className="category">제조사명/식품군</Item>
              <Item className="name">식품명</Item>
              <Item className="calorie">열량(kcal)</Item>
            </Row>
          </div>
          <div className="content">
            {data?.data.length ? (
              data?.data.map(
                (
                  { NUM, DESC_KOR, MAKER_NAME, GROUP_NAME, NUTR_CONT1 },
                  i: number
                ) => {
                  return (
                    <Row className="row" alignItems="center" key={`data-${i}`}>
                      <Item className="no">{NUM}</Item>
                      <Item className="category">
                        {MAKER_NAME || '-'} / {GROUP_NAME || '-'}
                      </Item>
                      <Item className="name">{DESC_KOR}</Item>
                      <Item className="calorie">{NUTR_CONT1}</Item>
                    </Row>
                  );
                }
              )
            ) : (
              <EmptyResult search={query.query as string} />
            )}
          </div>
          <Spacer size={64} mobileSize={32} />
          <Pagination params={paramsObj} page={page} total={total} limit={10} />
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default CalorieDictionary;
