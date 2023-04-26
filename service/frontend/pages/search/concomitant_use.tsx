import { EatTogether } from '@/../../@types/hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Cards from '@/components/search/concomitant_use/Cards';
import ConcomitantUseContent from '@/components/search/concomitant_use/ConcomitantUseContent';
import SearchPanel from '@/components/SearchPanel';
import SectionTitle from '@/components/SectionTitle';
import {
  fillEmpty,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const mockData: EatTogether[] = [
  {
    name: '인삼',
    thumbnail: '/assets/icon_concomitant_use_1.svg',
  },
] as any;

const emptyData = null;

const ConComitantUse: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { page } = useQuery({});

  const [search, setSearch] = useStateByEffect(
    () => query.query as string,
    [query.query],
    ''
  );

  const paramsObj = {
    query: query.query,
    page: page || 1,
  };
  const params = obj2params(paramsObj);
  const { data, error } = useSWR<{ total: number; data: EatTogether[] }>(
    `/api/eat-together?${params}`
  );

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        query: search,
        page: page || 1,
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
          label="의약품 병용 섭취 정보"
          emphasis
        />
      </ContentSection>
      <Spacer size={16} mobileSize={0} />
      <SearchPanel
        value={search}
        onChange={setSearch}
        onSubmit={searchHandler}
      />
      <ContentSection className={`font-notosans`}>
        <ConcomitantUseContent>
          <p>
            의약품 병용 섭취 시 주의가 필요한 <b>27가지 원료</b> 정보를
            제공합니다.
          </p>
        </ConcomitantUseContent>
        {data && (
          <Cards
            search={query.query as string}
            params={paramsObj}
            page={page}
            limit={20}
            total={data.total}
            data={fillEmpty(data.data, 5, emptyData) as any}
          />
        )}
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default ConComitantUse;
