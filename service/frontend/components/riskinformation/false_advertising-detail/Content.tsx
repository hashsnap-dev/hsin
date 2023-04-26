import { desktop, flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue100,
  AquaBlue150,
  AquaBlue200,
  AquaBlue50,
  AquaBlue500,
  AquaBlue550,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  .tag {
    font-size: 14px;
    font-weight: 500;
    border-radius: 9999px;
    border: 1px solid ${Gray600};
    padding: 5px 10px;
  }
  h1 {
    margin-top: 10px;
    font-size: 28px;
    font-weight: 700;
  }
  .extra {
    margin-top: 24px;
    color: ${Gray400};
  }
  .header {
    border-bottom: 1px solid ${Gray300};
    padding-bottom: 30px;
    margin-bottom: 16px;
  }
  li {
    display: list-item;
  }
  .content {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid ${Gray300};

    img {
      display: block;
      margin: 0 auto;
    }

    strong {
      margin-top: 16px;
      display: inline-block;
    }
    /* .thumbnail {
      width: 400px;
      height: 320px;
      background: no-repeat center / contain;
    }
    .text {
      flex: 1;
    }
    h4 {
      font-size: 18px;
      font-weight: 700;
    }
    p {
      margin-top: 16px;
      margin-bottom: 20px;
    } */
  }
  time {
    margin-left: 32px;
  }
  .goto {
    margin-top: 64px;
    width: 100%;
    padding-top: 56px;
    border-top: 1px solid ${Gray300};
  }

  ${mobile(css`
    .tag {
      font-size: 12px;
    }
    h1 {
      font-size: 18px;
    }
    .header {
      padding-bottom: 20px;
    }
    .extra {
      margin-top: 16px;
      font-size: 14px;
    }
    .content {
      flex-direction: column;

      .thumbnail {
        width: 100%;
        margin-bottom: 16px;
      }
      h4 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .goto {
      margin-top: 16px;
      padding-top: 32px;
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
