import { mobile } from '@/styles/utils';
import { CyanBlue } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  margin-top: 16px;
  background: url(/assets/image_guide_1.svg) ${CyanBlue} no-repeat right bottom;
  height: 280px;
  color: white;
  padding: 40px 48px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  h4 {
    font-size: 28px;
    font-weight: 700;
  }

  p {
    font-size: 20px;
    font-weight: 500;
  }

${mobile(css`
  margin-top: 20px;
  min-height: 440px;
  justify-content: start;
  background-size: 95%;
  padding: 32px;
  
  h4 {
    font-size: 26px;
  }
  p {
    font-size: 18px;
  }
`)}
`;

const GuideBanner: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default GuideBanner;
