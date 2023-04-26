import ContentSection from '@/components/ContentSection';
import Content from '@/components/hsin/DetailContent';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import type { NextPage } from 'next';
import { Row } from '@/layouts/flex-utils';
import { dateFormat } from '@/helper/utils';
import MoveButton from '@/components/MoveButton';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Script from 'next/script';
import Markdownit from '@/components/Markdownit';

const NoticesDetail: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { noticesId } = query;

  const { data, error } = useSWR(noticesId && `/board/notices/${noticesId}`);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="공지사항" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <div className="header">
            <h1 className="font-nanumsquare">{data?.title}</h1>
            <Row justifyContent="center">
              <span className="views">조회수 {data?.views ?? 0}</span>
              <span className="date">{dateFormat(data?.created_at)}</span>
            </Row>
          </div>
          <Markdownit className="content" text={data?.content} />
          <Row className="goto" justifyContent="space-between">
            <Row className="hidden">
              <MoveButton href="/" disabled={true}>
                이전
              </MoveButton>
              <Spacer size={4} mobileSize={0} />
              <MoveButton href="/" disabled={false}>
                다음
              </MoveButton>
            </Row>
            <MoveButton
              href={`/hsin/notices${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </Row>
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default NoticesDetail;
