import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import SearchDetails, { mat2matOptions, MaterialOption, } from '@/components/search/SearchDetails';
import BoardList, { BoardListItem, } from '@/components/search/product/BoardList';
import BoardTitle from '@/components/search/product/BoardTitle';
import useSWR from 'swr';
import { Functionalities, FunctionalityMaterials, IntegrationFoodList, } from 'hsin';
import { obj2params, useQuery, useStateByEffect } from '@/helper/utils';
import Pagination from '@/components/Pagination';
import SidePanel from '@/components/search/SidePanel';

const ORDER_OPTIONS = [
  { value: 'views', label: '조회수순' },
  { value: 'recently', label: '최신순' },
  { value: 'heart', label: '찜하기순' },
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

export const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'name', label: '제품명' },
  { value: 'company', label: '제조사' },
  // { value: 'country', label: '제조국' },
  { value: 'report_no', label: '신고번호' },
  // { value: 'content', label: '내용' },
];

const Product: NextPage = () => {
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

  const [mode, setMode] = useStateByEffect(() => query.mode, [query.mode], '');

  const [type, setType] = useStateByEffect(() => query.type, [query.type], '');

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

  const [materials, setMaterials] = useStateByEffect<MaterialOption[]>(
    () => {
      return [
        ...((query.materials as string)
          ?.split(',')
          .filter((i) => i)
          .map((str) => ({
            type: 'material',
            label: decodeURIComponent(str),
            value: decodeURIComponent(str),
          })) ?? []),
        ...((query.materialText as string)
          ?.split(',')
          .filter((i) => i)
          .map((str) => ({
            type: 'string',
            label: `"${decodeURIComponent(str)}"`,
            value: `[${decodeURIComponent(str)}]`,
          })) ?? []),
      ];
    },
    [query.materials, query.materialText],
    []
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

  const { page } = useQuery({});

  const [materialText, setMaterialText] = useStateByEffect(
    () => query.materialText as string,
    [query.materialText],
    ''
  );

  const [consonant, setConsonant] = useStateByEffect(
    () => query.consonant as string,
    [query.consonant],
    ''
  );

  const paramsObj = {
    page: page || 1,
    limit,
    query: query.query,
    mode: query.mode,
    type: query.type,
    materials: query.materials,
    functionalities: query.functionalities,
    consonant: query.consonant,
    searchType: query.searchType,
    materialText: query.materialText,
    sort: query.sort,
  };
  
  const params = obj2params(paramsObj);

  const { data: foodData, error: foodError } = useSWR<{
    total: number;
    data: IntegrationFoodList[];
  }>(`/api/foods?${params}`);
  const total = foodData?.total ?? 0;

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
        limit,
        query: search,
        mode,
        type,
        materials: materials
          .filter(({ type }) => type !== 'string')
          .map(({ value }) => encodeURIComponent(value))
          .join(','),
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        materialText: materials
          .filter(({ type }) => type === 'string')
          .map(({ value }) => value.slice(1, -1))
          .join(','),
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
        materials: materials
          .filter(({ type }) => type !== 'string')
          .map(({ value }) => encodeURIComponent(value))
          .join(','),
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant: str,
        searchType: searchType?.value,
        materialText: materials
          .filter(({ type }) => type === 'string')
          .map(({ value }) => value.slice(1, -1))
          .join(','),
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
        materials: materials
          .filter(({ type }) => type !== 'string')
          .map(({ value }) => encodeURIComponent(value))
          .join(','),
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        materialText: materials
          .filter(({ type }) => type === 'string')
          .map(({ value }) => value.slice(1, -1))
          .join(','),
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
        materials: materials
          .filter(({ type }) => type !== 'string')
          .map(({ value }) => encodeURIComponent(value))
          .join(','),
        functionalities: functionalities.map(({ id }) => id).join(','),
        consonant,
        searchType: searchType?.value,
        materialText: materials
          .filter(({ type }) => type === 'string')
          .map(({ value }) => value.slice(1, -1))
          .join(','),
        sort: data.value,
      })}`
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <SidePanel />
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="제품 검색" emphasis />
      </ContentSection>
      <SearchDetails
        useCountryType={true}
        useMaterial={true}
        search={(search as string) ?? ''}
        searchOptions={searchbarOptions}
        onSearchChange={setSearch}
        searchType={searchType}
        onSearchTypeChange={setSearchType}
        mode={(mode as string) ?? ''}
        onModeChange={setMode}
        type={(type as string) ?? ''}
        onTypeChange={setType}
        materials={materials}
        onMaterialsChange={setMaterials}
        functionalities={functionalities}
        onFunctionalitiesChange={setFunctionalities}
        consonant={consonant}
        onConsonantChange={changeConsonantHandler}
        onClick={searchHandler}
      />

      <ContentSection className={`font-notosans`}>
        <Spacer size={60} />
        <BoardTitle
          label="제품 목록"
          total={total}
          orderOption={order}
          orderOptions={ORDER_OPTIONS}
          onChangeOrder={orderChangeHandler}
          sizeOption={size}
          sizeOptions={SIZE_OPTIONS}
          onChangeSize={limitChangeHandler}
        />
        <BoardList
          page={+page}
          total={total}
          limit={limit}
          data={foodData?.data ?? []}
          params={params}
          search={(query.query as string) ?? ''}
        />
        <Spacer size={64} mobileSize={16} />
        <Pagination
          page={page}
          limit={limit}
          params={paramsObj}
          total={total}
        />
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default Product;
