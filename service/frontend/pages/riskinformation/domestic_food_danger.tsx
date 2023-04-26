import { EatTogether, StopSelling } from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content, {
  Card,
} from '@/components/riskinformation/domestic_food_danger/Content';
import SearchPanel from '@/components/SearchPanel';
import SectionTitle from '@/components/SectionTitle';
import {
  fillEmpty,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import type { NextPage } from 'next';
import useSWR from 'swr';
import FlexGrid from '@/components/FlexGrid';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'name', label: '제품명' },
  { value: 'company', label: '제조사' },
];

const DomesticFoodDanger: NextPage = () => {
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

  const { data, error } = useSWR<{ total: number; data: StopSelling[] }>(
    `/api/stop-selling?${params}`
  );
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
          label="회수 판매 중지 제품 정보"
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
          <p className="primary">
            국내에서 이미 유통 중인 식품 중 위생상의 위해가 발생하거나 발생할
            우려가 있는 제품으로 <b>회수 및 판매중지된 제품</b>을 공개합니다.
          </p>
          <p className="sub">
            소비자는 해당 제품을 구입장소에 되돌려주시고 판매자는 해당 식품
            판매를 중지하시고 회수업체에 반품하시기 바랍니다.
          </p>
          <p className="box">
            회수대상 관련규정 : 식품위생법 시행규칙 제 58조에 따른 별표 18 /
            위해식품 회수지침의 1등급~3등급에 포함되는 경우
          </p>

          <FlexGrid
            search={query.query as string}
            columns={4}
            spacing={16}
            data={data?.data ?? ([] as StopSelling[])}
            render={({
              id,
              name,
              thumbnails,
              company,
              expirationDate,
              registrationNumber,
            }) => {
              return (
                <Card
                  href={`/riskinformation/domestic_food_danger/${id}${globalThis.location?.search}`}
                >
                  <div className="thumbnail-wrapper">
                    <div
                      className="thumbnail"
                      style={{ backgroundImage: `url(${thumbnails[0]})` }}
                    />
                  </div>
                  <div className="content">
                    <p className="name">{name}</p>
                    <p className="company">제조사 : {company}</p>
                    <p className="date">유통기한 : {expirationDate}</p>
                  </div>
                </Card>
              );
            }}
          />
          <Spacer size={64} />
          <Pagination params={paramsObj} page={page} total={total} limit={12} />
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default DomesticFoodDanger;
