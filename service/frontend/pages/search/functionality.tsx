import type { NextPage } from 'next';
import Nav from '@/components/Nav';
import ContentSection from '@/components/ContentSection';
import SectionTitle from '@/components/SectionTitle';
import { Spacer } from '@/components/Flex';
import SearchPanel from '@/components/SearchPanel';
import CategoryTab from '@/components/search/functionality/CategoryTab';
import CategoryCards from '@/components/search/functionality/CategoryCards';
import { Functionalities } from 'hsin';
import Footer from '@/components/Footer';
import {
  fillEmpty,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import { FunctionalityType } from '@/helper/enums';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState } from 'react';

const mockData: (Functionalities & { materials: string[] })[] = [
  {
    type: '질병발생위험감소기능',
    id: '1-1',
    functionality: '골다공증 발생 위험 감소에 도움을 줌(질병발생위험감소기능)',
    materials: ['칼슘', '비타민 D'],
  },
  {
    type: '질병발생위험감소기능',
    id: '1-2',
    functionality: '충치발생위험감소에 도움을 줌',
    materials: ['자일리톨'],
  },
  {
    type: '영양소 기능',
    id: '2-1',
    functionality: '갑상선 호르몬의 합성에 필요',
    materials: ['요오드'],
  },
  {
    type: '생리활성기능',
    id: '3-1',
    functionality: '면역기능개선',
    materials: [],
  },
  {
    type: '질병발생위험감소기능',
    id: '1-1',
    functionality: '골다공증 발생 위험 감소에 도움을 줌(질병발생위험감소기능)',
    materials: ['칼슘', '비타민 D'],
  },
  {
    type: '질병발생위험감소기능',
    id: '1-2',
    functionality: '충치발생위험감소에 도움을 줌',
    materials: ['자일리톨'],
  },
  {
    type: '영양소 기능',
    id: '2-1',
    functionality: '갑상선 호르몬의 합성에 필요',
    materials: ['요오드'],
  },
  {
    type: '생리활성기능',
    id: '3-1',
    functionality: '면역기능개선',
    materials: [],
  },
  {
    type: '질병발생위험감소기능',
    id: '1-1',
    functionality: '골다공증 발생 위험 감소에 도움을 줌(질병발생위험감소기능)',
    materials: ['칼슘', '비타민 D'],
  },
  {
    type: '질병발생위험감소기능',
    id: '1-2',
    functionality: '충치발생위험감소에 도움을 줌',
    materials: ['자일리톨'],
  },
  {
    type: '영양소 기능',
    id: '2-1',
    functionality: '갑상선 호르몬의 합성에 필요',
    materials: ['요오드'],
  },
  {
    type: '생리활성기능',
    id: '3-1',
    functionality: '면역기능개선',
    materials: [],
  },
];
const emptyData = { type: '' as any, id: '', functionality: '', materials: [] };

const COLUMNS = 5;

const options = [
  { value: '', label: '통합' },
  { value: 'title', label: '기능명' },
  { value: 'content', label: '설명' },
];

const Functionality: NextPage = () => {
  // const {
  //   type,
  // } = useQuery();

  const router = useRouter();
  const { query } = router;
  const [type, setType] = useStateByEffect(
    () => {
      switch (Number(query.type)) {
        case FunctionalityType.nutrient:
          return '영양소 기능';
        case FunctionalityType.physiology:
          return '생리활성기능';
        case FunctionalityType.reduceDisease:
          return '질병발생위험감소기능';
        default:
          return '';
      }
    },
    [query.type],
    ''
  );

  const [search, setSearch] = useStateByEffect(
    () => query.query as string,
    [query.query],
    ''
  );

  const [currentOption, setCurrentOption] = useState(options[0]);

  const paramsObj = {
    type,
    query: query.query,
  };
  const params = obj2params(paramsObj);
  const { data: funcData, error: funcError } = useSWR<{
    data: Functionalities[];
  }>(`/api/functionalities?${params}`);

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        type: query.type,
        query: search,
      })}`
    );
  };

  const typeChangeHandler = (type: FunctionalityType) => {
    router.push(
      `?${obj2params({
        type,
        query: search,
      })}`
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="기능성 검색" emphasis />
      </ContentSection>
      <Spacer size={16} mobileSize={0} />
      <SearchPanel
        value={search}
        onChange={setSearch}
        onSubmit={searchHandler}
        placeholder="내 몸에 필요한 기능을 입력하세요. (ex. 간, 면역, 에너지 등)"
      />
      <ContentSection className={`font-notosans`}>
        <CategoryTab value={query.type as any} onChange={typeChangeHandler} />
        <CategoryCards
          search={query.query as string}
          data={
            funcData
              ? fillEmpty([...funcData.data].reverse(), COLUMNS, emptyData)
              : []
          }
        />
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default Functionality;
