import ContentSection from '@/components/ContentSection';
import Content from '@/components/hsin/DetailContent';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import type { NextPage } from 'next';
import SearchPanel from '@/components/SearchPanel';
import { Column, Row } from '@/layouts/flex-utils';
import { dateFormat, useQuery } from '@/helper/utils';
import Pagination from '@/components/Pagination';
import Dropdown from '@/components/Dropdown';
import { useState } from 'react';
import Link from '@/components/Link';
import MoveButton from '@/components/MoveButton';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';
import { Gray300 } from '@/styles/variables';
import { alignItems } from '@/styles/utils';
import rehypeRaw from 'rehype-raw';
import Markdownit from '@/components/Markdownit';

// const SIZE_OPTIONS = [
//   { value: 10, label: '10개씩' },
//   { value: 30, label: '30개씩' },
//   { value: 50, label: '50개씩' },
//   { value: 100, label: '100개씩' },
// ];

const AttachedFile = styled(Link)`
  margin-top: 16px;
  height: 56px;
  border: 1px solid ${Gray300};
  font-weight: 500;
  ${alignItems('center')}
  padding: 0 20px 0 52px;
  background: url(/assets/icon_board_file.svg) no-repeat left 20px center;
`;

const Notices: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { campaignId } = query;

  const { data, error } = useSWR(
    campaignId && `/board/campaigns/${campaignId}`
  );

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="캠페인" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <div className="header">
            <h1 className="font-nanumsquare">{data?.title}</h1>
            <Row justifyContent="center">
              <span className="views">조회수 {data?.views}</span>
              <span className="date">{dateFormat(data?.created_at)}</span>
            </Row>
          </div>
          <div className="content">
            <Markdownit className="content" text={data?.content} />
            {data?.files?.map(({ name, url }: any, i: number) => (
              <AttachedFile
                href={url}
                target="_blank"
                key={`attached-file-${i}`}
              >
                {name}
              </AttachedFile>
            ))}
          </div>
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
              href={`/hsin/campaign${globalThis.location?.search}`}
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

export default Notices;
