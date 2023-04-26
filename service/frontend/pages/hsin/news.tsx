import ContentSection from '@/components/ContentSection';
import Content from '@/components/hsin/notices/Content';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import type { NextPage } from 'next';
import SearchPanel from '@/components/SearchPanel';
import { Column, Row } from '@/layouts/flex-utils';
import {
  dateFormat,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import Pagination from '@/components/Pagination';
import Dropdown from '@/components/Dropdown';
import { useState } from 'react';
import Link from '@/components/Link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
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

const News: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { page } = useQuery();
  // const total = 300;
  const [size] = useStateByEffect(
    () => computeSize(query.limit),
    [query.limit],
    SIZE_OPTIONS[0]
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

  const paramsObj = {
    _start: (page - 1) * Number(query.limit ?? 10),
    _limit: query.limit ?? 10,
    ...(!query.searchType
      ? {
          ['_where[_or][0][content_contains]']: query.query as string,
          ['_where[_or][1][title_contains]']: query.query as string,
        }
      : {
          [query.searchType + '_contains']: query.query as string,
        }),
    _sort: 'created_at:DESC',
  };
  const params = obj2params(paramsObj);

  const { data: board, error: boardError } = useSWR(
    `/board/news-data?${params}`
  );
  // const {data: notices, error: noticesError} = useSWR(
  //   `/board/news-data`
  // );
  const { data: total, error: totalError } = useSWR(
    `/board/news-data/count?${params}`
  );

  const [list] = useStateByEffect<
    {
      id: number;
      content: string;
      created_at: string;
      updated_at: string;
      tags: string;
      title: string;
      views: number;
    }[]
  >(() => [...(board ?? [])], [board, size], []);

  const sizeChangeHandler = (data: { value: number }) => {
    router.push(
      `?${obj2params({
        page: 1,
        limit: data.value,
        query: search,
        searchType: searchType.value,
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
      })}`
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="뉴스자료" emphasis />
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
          <Dropdown
            className="desktop"
            value={size}
            options={SIZE_OPTIONS}
            onChange={sizeChangeHandler}
          />
          <Column className="board">
            <Row className="head">
              <div className="no">번호</div>
              <div className="title">제목</div>
              <div className="author">작성자</div>
              <div className="date">등록일</div>
              <div className="views">조회수</div>
            </Row>
            {list.map(({ id, title, created_at, views }, i) => {
              return (
                <Link
                  href={`/hsin/news/${id}${globalThis.location?.search}`}
                  key={`board-item-${i}`}
                >
                  <Row className={'row'}>
                    <div className="no">{id}</div>
                    <div className="title">{title}</div>
                    <div className="author">포털관리자</div>
                    <div className="date">{dateFormat(created_at)}</div>
                    <div className="views">{views}</div>
                  </Row>
                </Link>
              );
            })}
            {query.query && !board?.length && (
              <EmptyResult search={query.query as string} />
            )}
          </Column>
        </Content>
        <Spacer size={64} mobileSize={32} />
        <Pagination
          params={{
            page,
            limit: query.limit,
            query: search,
            searchType: searchType.value,
          }}
          page={page}
          total={total}
          limit={size.value}
        />
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default News;
