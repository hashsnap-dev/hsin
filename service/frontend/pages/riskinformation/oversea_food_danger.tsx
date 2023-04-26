import { EatTogether, StopSelling, ForeignBlockFoodList, I2715 } from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content, {
  Card,
} from '@/components/riskinformation/oversea_food_danger/Content';
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
import { useRouter } from 'next/router';

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'name', label: '제품명' },
  { value: 'company', label: '제조사' },
  { value: 'country', label: '제조국' },
];

const OverseaFoodDanger: NextPage = () => {
  const { page } = useQuery();
  const router = useRouter();
  const { query } = router;

  const [search, setSearch] = useStateByEffect(
    () => query.query,
    [query.query],
    ''
  );

  const [searchType, setSearchType] = useStateByEffect(
    () => {
      const typeObj = searchbarOptions.find(
        ({ value }) => value === query.searchType
      );
      return typeObj ?? searchbarOptions[0];
    },
    [query.searchType],
    searchbarOptions[0]
  );

  const paramsObj = {
    page: page || 1,
    query: query.query,
    searchType: query.searchType,
  };
  const params = obj2params(paramsObj);

  const { data, error } = useSWR<{
    total: number;
    data: I2715[];
  }>(`/api/foreign-block?${params}`);
  const total = data?.total ?? 0;

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        type: query.type,
        query: search,
        searchType: searchType.value,
      })}`
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle
          className="desktop"
          label="해외직구 위해 식품 차단 정보"
          emphasis
        />
      </ContentSection>
      <SearchPanel
        value={(search as string) ?? ''}
        onChange={setSearch}
        option={searchType}
        options={searchbarOptions}
        onOptionChange={setSearchType}
        onSubmit={searchHandler}
      />
      <ContentSection className={`font-notosans`}>
        <Content>
          <FlexGrid
            search={query.query as string}
            columns={2}
            spacing={16}
            data={data?.data ?? ([] as I2715[])}
            render={({
              PRDT_NM: name,
              IMAGE_URL: thumbnail,
              MUFC_CNTRY_NM: from,
              MUFC_NM: company,
              INGR_NM_LST: problem,
              STT_YMD: date,
            }) => {
              return (
                <Card>
                  <Row>
                    <div className="thumbnail-wrapper">
                      <div
                        className="thumbnail"
                        style={{
                          backgroundImage: `url(${
                            thumbnail.split(',').map((s) => s.trim())[0] ?? ''
                          })`,
                        }}
                      />
                    </div>
                    <div className="content">
                      <Row justifyContent="space-between">
                        <h2>{from}</h2>
                        <time>
                          {date?.slice(0, 4) +
                            '-' +
                            date?.slice(4, 6) +
                            '-' +
                            date?.slice(6, 8)}
                        </time>
                      </Row>
                      <h1>{firstLetterUpperCase(name)}</h1>
                      <h3>제조사명</h3>
                      <p>{company}</p>
                      <h3>검출성분</h3>
                      <p>{problem}</p>
                    </div>
                  </Row>
                </Card>
              );
            }}
          />
          <Spacer size={64} mobileSize={32} />
          <Pagination params={paramsObj} page={page} total={total} limit={10} />
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default OverseaFoodDanger;
