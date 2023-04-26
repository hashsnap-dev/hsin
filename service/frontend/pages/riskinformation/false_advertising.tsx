import {
  EatTogether,
  StopSelling,
  ForeignBlockFoodList,
  FalseAdvertising,
} from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content from '@/components/riskinformation/false_advertising/Content';
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
import BoardTitle from '@/components/riskinformation/false_advertising/BoardTitle';
import { useRouter } from 'next/router';
import EmptyResult from '@/components/EmptyResult';

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
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

const type2string = (type: string) => {
  if (type === 'report') return '식약처보도자료';
  else if (type === 'exposed_case') return '적발사례';
};

const strToDate = (str: string) => {
  const d = new Date(str);
  const yy = d.getFullYear();
  const mm = (d.getMonth() + 1 + '').padStart(2, '0');
  const dd = (d.getDate() + '').padStart(2, '0');
  return [yy, mm, dd].join('.');
};

const FalseAdvertisingComponent: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { page } = useQuery();

  const [type, setType] = useStateByEffect(() => query.type, [query.type], '');

  const [size, setSize] = useStateByEffect(
    () => computeSize(query.limit),
    [query.limit],
    SIZE_OPTIONS[0]
  );
  const limit = size?.value;

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
    _start: (page - 1) * Number(query.limit ?? 10),
    _limit: query.limit ?? 10,
    ...(type && { type: query.type }),
    ...(!query.searchType
      ? {
          ['_where[_or][0][content_contains]']: query.query as string,
          ['_where[_or][1][title_contains]']: query.query as string,
        }
      : {
          [query.searchType + '_contains']: query.query as string,
        }),
    _sort: 'published_at:DESC',
  };
  const params = obj2params(paramsObj);

  const paginationParams = {
    page: 1,
    limit: query.limit,
    ...(type && { type: query.type }),
    query: search,
  };

  const { data: board, error: boardError } = useSWR(
    `/board/false-advertisings?${params}`
  );
  const { data: total, error: totalError } = useSWR(
    `/board/false-advertisings/count?${params}`
  );

  const limitChangeHandler = (data: { value: number; label: string }) => {
    router.push(
      `?${obj2params({
        page: 1,
        limit: data.value,
        type,
      })}`
    );
  };
  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
        limit: query.limit,
        query: search,
        searchType: searchType.value,
        type,
      })}`
    );
  };
  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="허위과대광고 현황" emphasis />
      </ContentSection>
      <SearchPanel
        value={(search as string) ?? ''}
        onChange={setSearch}
        option={searchType}
        options={searchbarOptions}
        onOptionChange={setSearchType}
        onSubmit={searchHandler}
      />
      <Spacer size={40} mobileSize={16} />
      <ContentSection className={`font-notosans`}>
        <Content>
          <BoardTitle
            type={type as string}
            sizeOption={size}
            sizeOptions={SIZE_OPTIONS}
            onChangeSize={limitChangeHandler}
          />
          {/* <Spacer size={1} mobileSize={1} /> */}
          <div className="header">
            <Row className="row">
              <div className="mobile-block title-wrapper">
                <Item className="category">카테고리</Item>
                <Item className="title">제목</Item>
              </div>
              <div className="mobile-block meta-wrapper">
                <Item className="date">등록일</Item>
                {/* <Item className="view">조회수</Item> */}
              </div>
            </Row>
          </div>
          <div className="content">
            {board && board.length ? (
              board.map(
                ({
                  thumbnail,
                  type,
                  title,
                  violation_category,
                  violation_contents,
                  media,
                  published_at,
                  phrase,
                  result,
                  view,
                  id,
                }: any) => {
                  return (
                    <Link
                      href={`/riskinformation/false_advertising/${id}${globalThis.location?.search}`}
                      key={id}
                    >
                      <Row className="row" alignItems="center">
                        <div className="mobile-block title-wrapper">
                          <Item className="category">{type2string(type)}</Item>
                          <Item className="title">{title}</Item>
                        </div>
                        <div className="mobile-block meta-wrapper">
                          <Item className="date">
                            {strToDate(published_at)}
                          </Item>
                          {/* <Item className="view">{view ?? 0}</Item> */}
                        </div>
                      </Row>
                    </Link>
                  );
                }
              )
            ) : (
              <EmptyResult search={query.query as string} />
            )}
          </div>
          <Spacer size={64} mobileSize={16} />
          <Pagination
            params={paginationParams}
            page={page}
            total={total}
            limit={limit}
          />
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default FalseAdvertisingComponent;
