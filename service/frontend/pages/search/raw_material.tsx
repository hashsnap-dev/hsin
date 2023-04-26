import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import SearchDetails from '@/components/search/SearchDetails';
import BoardList from '@/components/search/raw_material/BoardList';
import BoardTitle from '@/components/search/raw_material/BoardTitle';
import { useState } from 'react';
import { Functionalities, FunctionalityMaterials } from 'hsin';
import { MaterialType } from '@/helper/enums';
import { obj2params, useQuery, useStateByEffect } from '@/helper/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const mockData: FunctionalityMaterials[] = [
  {
    no: ['1'],
    name: '복분자 추출물(RE-20)',
    type: '개별인정원료',
    company: '(주)비엔텍',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['2'],
    name: '실크단백질 산가수분해물(Sil-Q1)',
    type: '개별인정원료',
    company: '월드웨이(주)',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['3'],
    name: '밀 추출물(Ceratiq)',
    type: '개별인정원료',
    company: '(주)노바렉스',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['4'],
    name: '미숙여주주정추출분말',
    type: '개별인정원료',
    company: '콜마비앤에이치(주)',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['5'],
    name: '회화나무열매추출물',
    type: '기능성원료-고시형원료',
    company: '',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['6'],
    name: '갈락토올리고당 분말(Bimuno GOS Powder)',
    type: '개별인정원료',
    company: '(주)비타씨',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['7'],
    name: '발효우슬등복합물',
    type: '개별인정원료',
    company: '에스케이 바이오랜드(주)',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['8'],
    name: '피니톨 분말',
    type: '개별인정원료',
    company: '(주)디와이내츄럴',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: true,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['9'],
    name: '허니부쉬추출발효분말',
    type: '개별인정원료',
    company: '(주)휴온스',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: true,
    eatTogether: '',
    description: '',
    requirements: '',
  },
  {
    no: ['9'],
    name: '풋사과추출물 애플페논(Applephenon)',
    type: '개별인정원료',
    company: '(주)비타씨',
    functionality: ['기능성 1', '기능성 2', '기능성 3'],
    amount: '',
    warn: [],
    abolished: false,
    canceled: false,
    eatTogether: '',
    description: '',
    requirements: '',
  },
];

const ORDER_OPTIONS = [
  { value: 'recently', label: '최신순' },
  { value: 'views', label: '조회수순' },
  // { value: 'heart', label: '찜하기순' },
];
const SIZE_OPTIONS = [
  { value: 10, label: '10개씩' },
  { value: 30, label: '30개씩' },
  { value: 50, label: '50개씩' },
  { value: 100, label: '100개씩' },
];
const computeSize = (limit: string | any) => {
  const size = SIZE_OPTIONS.find(({ value }) => value === Number(limit));
  if (size) {
    return size;
  } else {
    return SIZE_OPTIONS[0];
  }
};

const computeType = (type: string) => {
  switch (Number(type)) {
    case 0:
      return '고시형원료-영양소';
    case 1:
      return '고시형원료-기능성원료';
    case 2:
      return '개별인정원료';
    case 3:
      return '사용불가원료';
    default:
      return '';
  }
};

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'name', label: '원료명' },
  { value: 'company', label: '업체명' },
  // { value: 'content', label: '내용' },
  // { value: 'no', label: '신고번호' },
];

const RawMaterial: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { page } = useQuery();
  const [mode, setMode] = useStateByEffect(() => query.mode, [query.mode], '');

  const [type, setType] = useStateByEffect(
    () => {
      return Number.isNaN(Number(query.type)) ? '' : Number(query.type);
    },
    [query.type],
    ''
  );
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

  const { data: funcData, error: funcError } = useSWR<{
    data: Functionalities[];
  }>(
    query.functionalities
      ? `/api/functionalities?id=${query.functionalities as string}`
      : null
  );
  const [functionalities, setFunctionalities] = useStateByEffect<
    Functionalities[]
  >(() => funcData?.data ?? [], [funcData], []);

  const [consonant, setConsonant] = useStateByEffect(
    () => query.consonant as string,
    [query.consonant],
    ''
  );

  const [order, setOrder] = useStateByEffect(
    () => {
      const order = ORDER_OPTIONS.find(({ value }) => value === query.sort);
      return order ?? ORDER_OPTIONS[0];
    },
    [query.sort],
    ORDER_OPTIONS[0]
  );

  const [size, setSize] = useStateByEffect(
    () => computeSize(query.limit),
    [query.limit],
    SIZE_OPTIONS[0]
  );
  const limit = size?.value;

  const paramsObj = {
    page: page || 1,
    limit,
    query: query.query,
    mode,
    type: computeType(query.type as string),
    functionalities: query.functionalities,
    consonant: query.consonant,
    searchType: query.searchType,
    sort: query.sort,
  };
  const params = obj2params(paramsObj);

  const { data: matData, error: matError } = useSWR<{
    total: number;
    data: FunctionalityMaterials[];
  }>(`/api/materials?${params}`);
  const total = matData?.total ?? 0;
  const { data: matCount, error: matCountError } = useSWR<{
    eachApprovalCount: number;
    forbidCount: number;
    notificationCount: number;
    nutrientCount: number;
    totalCount: number;
  }>(`/api/materials/count?${params}`);

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
        limit,
        query: search,
        mode,
        type,
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        sort: query.sort,
      })}`
    );
  };

  const changeConsonantHandler = (str?: string) => {
    router.push(
      `?${obj2params({
        page: 1,
        limit,
        query: search,
        mode,
        type,
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant: str,
        searchType: searchType?.value,
        sort: query.sort,
      })}`
    );
  };

  const limitChangeHandler = (data: { value: number; label: string }) => {
    router.push(
      `?${obj2params({
        page: 1,
        limit: data.value,
        query: search,
        mode,
        type,
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        sort: query.sort,
      })}`
    );
  };
  const orderChangeHandler = (data: { value: string }) => {
    router.push(
      `?${obj2params({
        page: 1,
        limit,
        query: search,
        mode,
        type,
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        sort: data.value,
      })}`
    );
  };
  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="원료 검색" emphasis />
      </ContentSection>
      <SearchDetails
        search={(search as string) ?? ''}
        searchOptions={searchbarOptions}
        onSearchChange={setSearch}
        searchType={searchType}
        onSearchTypeChange={setSearchType}
        mode={(mode as string) ?? ''}
        onModeChange={setMode}
        functionalities={functionalities}
        onFunctionalitiesChange={setFunctionalities}
        consonant={consonant}
        onConsonantChange={changeConsonantHandler}
        onClick={searchHandler}
      />
      <ContentSection className={`font-notosans`}>
        <Spacer size={60} />
        <BoardTitle
          type={type as MaterialType}
          countData={matCount}
          orderOption={order}
          orderOptions={ORDER_OPTIONS}
          onChangeOrder={orderChangeHandler}
          sizeOption={size}
          sizeOptions={SIZE_OPTIONS}
          onChangeSize={limitChangeHandler}
        />
        <BoardList
          search={(query.query as string) ?? ''}
          params={{ ...paramsObj, type: query.type }}
          page={+page}
          total={total}
          limit={limit}
          data={matData?.data ?? []}
        />
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default RawMaterial;
