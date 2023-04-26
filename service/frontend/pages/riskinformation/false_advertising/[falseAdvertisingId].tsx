import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'next/router';
import { Column, Row } from '@/layouts/flex-utils';
import Content from '@/components/riskinformation/false_advertising-detail/Content';
import MoveButton from '@/components/MoveButton';
import useSWR from 'swr';
import Script from 'next/script';
import Markdownit from '@/components/Markdownit';

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

const FalseAdvertisingDetail: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { falseAdvertisingId } = query;

  const { data, error } = useSWR(
    falseAdvertisingId && `/board/false-advertisings/${falseAdvertisingId}`
  );

  const item = data ?? ({} as any);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="허위과대광고 현황" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <Spacer size={64} mobileSize={16} />
          <Column className="header" alignItems="center">
            <div className="tag">{type2string(item.type)}</div>
            <h1 className="font-nanumsquare">{item.title}</h1>
            <div className="extra">
              조회수 <span>{(item as any).view ?? 0}</span>{' '}
              <time>{strToDate(item.published_at)}</time>
            </div>
          </Column>
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
              href={`/riskinformation/false_advertising${globalThis.location?.search}`}
              primary
            >
              목록
            </MoveButton>
          </Row>
          <Spacer size={180} mobileSize={100} />
        </Content>
      </ContentSection>
      <Footer />
    </>
  );
};

export default FalseAdvertisingDetail;
