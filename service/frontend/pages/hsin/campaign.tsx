import { EatTogether, StopSelling } from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content, { Card } from '@/components/hsin/campaign/Content';
import SearchPanel from '@/components/SearchPanel';
import SectionTitle from '@/components/SectionTitle';
import {
  dateFormat,
  fillEmpty,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import type { NextPage } from 'next';
import useSWR from 'swr';
import FlexGrid from '@/components/FlexGrid';
import Pagination from '@/components/Pagination';
import { Row } from '@/layouts/flex-utils';
import { useRouter } from 'next/router';

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

const data = {
  data: [
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
    {
      id: 'test',
      title: '[포스트 팔로우 이벤트] 스타벅스 기프티콘 증정',
      date: '2021.06.21',
      views: 100,
      thumbnail: 'https://picsum.photos/400/400',
    },
  ],
};

const Campaign: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { page } = useQuery();
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
    _start: (page - 1) * Number(12),
    _limit: 12,
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
    `/board/campaigns?${params}`
  );
  const { data: total, error: totalError } = useSWR(
    `/board/campaigns/count?${params}`
  );
  
  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
        limit: 12,
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
        <SectionTitle className="desktop" label="캠페인" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <SearchPanel
          value={(search as string) ?? ''}
          onChange={setSearch}
          option={searchType}
          options={searchbarOptions}
          onOptionChange={setSearchType}
          onSubmit={searchHandler}
        />
        <Content>
          <FlexGrid
            search={query.query as string}
            columns={4}
            spacing={16}
            mobileSpacing={8}
            data={board ?? []}
            render={({ id, title, created_at, views, thumbnail }: any) => {
              return (
                <Card
                  href={`/hsin/campaign/${id}${globalThis.location?.search}`}
                >
                  <div className="thumbnail-wrapper">
                    <div
                      className="thumbnail"
                      style={{ backgroundImage: `url(${thumbnail?.url})` }}
                    />
                  </div>
                  <div className="content">
                    {/* <p className="date">{dateFormat(created_at)}</p> */}
                    <p className="title" style={{marginBottom: 0}}>{title}</p>
                    {/* <Row justifyContent="space-between">
                      <p className="views">조회수 {views}</p>
                    </Row> */}
                  </div>
                </Card>
              );
            }}
          />
          <Spacer size={64} />
          <Pagination
            params={{
              page,
              query: search,
              searchType: searchType.value,
            }}
            page={page}
            total={total}
            limit={12}
          />
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default Campaign;
