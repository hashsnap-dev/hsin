import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import SearchPanel from '@/components/SearchPanel';
import PostsList from '@/components/information/post/PostsList';
import { useRouter } from 'next/router';
import {
  fillEmpty,
  obj2params,
  useQuery,
  useStateByEffect,
} from '@/helper/utils';
import useSWR from 'swr';
import Pagination from '@/components/Pagination';
import qs from 'qs';

const searchbarOptions = [
  { value: '', label: '통합' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
];

const mockData = Array.from({ length: 12 }, (_, i) => ({
  thumbnail: 'https://picsum.photos/288/288?' + i,
  title: '<건기식협회X빨강머리N> 건강제품 살 땐 건강기능식품이 맞는지..',
  createdDate: '2021-06-21',
  id: i,
  href: '/information/post',
}));

const Post: NextPage = () => {
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
    _sort: 'created_at:DESC',
    ...(!query.searchType
      ? {
          ['_where[_or][0][content_contains]']: query.query as string,
          ['_where[_or][1][title_contains]']: query.query as string,
        }
      : {
          [query.searchType + '_contains']: query.query as string,
        }),
  };
  const params = obj2params(paramsObj);

  const { data: board, error: boardError } = useSWR(
    `/board/information-posts?${params}`
  );
  const { data: total, error: totalError } = useSWR(
    `/board/information-posts/count?${params}`
  );

  const searchHandler = () => {
    router.push(
      `?${obj2params({
        page: 1,
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
        <SectionTitle className="desktop" label="쏙쏙 건강 정보" emphasis />
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
        <PostsList
          page={+page}
          total={+total}
          limit={12}
          data={fillEmpty(board ?? [], 4, {})}
        />
        <Spacer size={64} mobileSize={32} />
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
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default Post;
