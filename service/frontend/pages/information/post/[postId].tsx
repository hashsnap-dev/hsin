import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import Content from '@/components/information/post-detail/Content';
import MoveButton from '@/components/MoveButton';
import useSWR from 'swr';
import { dateFormat } from '@/helper/utils';
import Script from 'next/script';
import Markdownit from '@/components/Markdownit';

const mockData = {
  title: (
    <>
      {'<'}건기식협회X빨강머리N{'>'} <br />
      건강제품 살 땐 건강기능식품이 맞는지 확인하세요!
    </>
  ),
  createdDate: '2021.06.21',
  thumbnail: 'https://picsum.photos/700/700',
  body: (
    <div>
      <br />
      인기 인스타툰 작가
      <br />
      빨강머리N(@redhair_enne)님과 콜라보한
      <br />
      2021년 건강기능식품 홍보캠페인
      <br />
      인생은 독고다이! 건강은 셀프!
      <br />
      라는 빨강머리앤님
      <br />
      건강에 도움을 줄 건강기능식품을
      <br />
      서치하던 중 놀라운 사실을 발견했는데요,
      <br />
      <br />
      우리가 먹는 건강제품이 모두 건강기능식품은 아니라는점!
      <br />
      <br />
      건강기능식품
      <br />
      과학적으로 인정받은 기능성 원료를 이용해 제조한 식품
      <br />
      안전성 및 기능성 심사 O<br />
      기능성 식약처인증 O<br />
      일일 섭취량 기준 O<br />
      <br />
      일반식품
      <br />
      건강식품, 건강보조식품, 천연식품 등<br />
      안전성 및 기능성 심사 X<br />
      기능성 식약처인증 X<br />
      일일 섭취량 기준 X<br />
      <br />
      그럼 제품이 건강기능식품이라는 것을
      <br />
      어떻게 알까요?
      <br />
      패키지에 건강기능식품 인정마크가 있는지
      <br />
      확인하시면 된답니다!
      <br />
      <br />
      자세한 내용은 아래 웹툰을 확인해주세요:)
    </div>
  ),
};

const Information: NextPage = () => {
  const { query } = useRouter();
  const postId = query.postId;
  const page = query.page || '1';
  const total = query.total || 3000;
  const limit = query.limit || 12;

  const prevPostId = '';
  const nextPostId = '0';

  const { data: post, error: postsError } = useSWR(
    `/board/information-posts/${postId}`
  );
  const { title, created_at, thumbnail, content } = post ?? {};

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="쏙쏙 건강 정보" emphasis />
        <Content className="font-notosans">
          <div className="header">
            <h2 className="font-nanumsquare">{title}</h2>
            <time>{dateFormat(created_at)}</time>
          </div>
          <div className="body">
            <Markdownit text={content} />
          </div>
          <div className="footer">
            <div className="l"></div>
            {/* <div className="l">
              <MoveButton
                href={
                  prevPostId
                    ? `/information/post/${prevPostId}?page=${page}&total=${total}&limit=${limit}`
                    : '/'
                }
                disabled={!prevPostId}
              >
                이전
              </MoveButton>
              <MoveButton
                href={
                  nextPostId
                    ? `/information/post/${nextPostId}?page=${page}&total=${total}&limit=${limit}`
                    : '/'
                }
                disabled={!nextPostId}
              >
                다음
              </MoveButton>
            </div> */}
            <MoveButton
              href={`/information/post${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </div>
        </Content>
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default Information;
