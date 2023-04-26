import { Gray300, Gray400 } from '@/styles/variables';
import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .header {
    text-align: center;
    border-bottom: 1px solid ${Gray300};
    padding-bottom: 30px;
    margin-bottom: 16px;

    h1 {
      margin-top: 48px;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .views,
    .date {
      color: ${Gray400};
    }
    .date {
      margin-left: 32px;
    }
  }
  .content,
  .header + div {
    padding-top: 32px;
    /* font-size: 14px; */
    text-align: left;
  }
  .content p img,
  .header + div p img {
    display: block;
    margin: 0 auto;
  }
  .goto {
    margin-top: 64px;
    width: 100%;
    padding-top: 56px;
    border-top: 1px solid ${Gray300};
  }
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
