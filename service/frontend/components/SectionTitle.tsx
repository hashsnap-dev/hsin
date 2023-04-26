import { AquaBlue500 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { desktop, mobile } from '@/styles/utils';

const Container = styled.h4`
  color: #2c2f31;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  font-size: 18px;
  font-weight: 700;
  padding-left: 30px;
  background: url(/assets/icon_health_graph.png) no-repeat;

  .more {
    display: block;
    background: url(/assets/icon_section_title_more.png) no-repeat right center;
    padding-right: 23px;
  }

${mobile(css`
  font-size: 16px;
`)}
`;

const Emphasis = styled.div`
  height: 4px;
  background: #217FEF;

  &:before {
    margin-top: 16px;
    display: block;
    content: '';
    width: 240px;
    height: 100%;
    background: ${AquaBlue500};
  }
`;

const SectionTitle: FC<{ label: string; more?: string, emphasis?: boolean; className?: string }> = ({ label, more = '', emphasis = false, className }) => {
  return <>
    <Container className={'font-nanumsquare ' + className}>
      <span>{label}</span>
      {more && <Link href={more} className="more">더보기</Link>}
    </Container>
    {emphasis && <Emphasis className={className} />}
  </>;
};

export default SectionTitle;
