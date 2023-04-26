import {
  AquaBlue500,
  AquaBlue600,
  Gray100,
  Gray300,
  Gray400,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { flex, mobile } from '@/styles/utils';

const Container = styled.div`
  .header {
    padding: 40px 0;
    border-bottom: 1px solid ${Gray300};
  }
  h2 {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: ${Gray600};
  }
  time {
    margin-top: 24px;
    display: block;
    font-size: 18px;
    color: ${Gray400};
    text-align: center;
  }
  .body {
    margin-top: 32px;
    text-align: center; // FIXME: 작업완료시 제거
    font-size: 18px;
    color: ${Gray600};
  }
  .footer {
    margin-top: 32px;
    border-top: 1px solid ${Gray300};
    padding-top: 56px;
    display: flex;
    justify-content: space-between;

    .l a {
      margin-right: 4px;
    }
  }

  p {
    margin-top: 32px;
    text-align: left;
  }
  p img {
    display: block;
    margin: 0 auto;
  }
  blockquote p {
    display: inline-block;
    padding: 32px 80px;
    font-family: 'Noto Sans KR';
    background: ${Gray100};
    border: 1px solid ${Gray300};
    border-radius: 9999px;
    border-bottom-left-radius: 0;
    font-weight: 500;
    font-size: 20px;
    /* &:before {content: '“'}
    &:after {content: '“'} */
  }
  ${mobile(css`
    .header {
      padding-top: 32px;
      padding-bottom: 20px;
    }
    h2 {
      font-size: 18px;
    }
    time {
      margin-top: 16px;
      font-size: 14px;
    }
    blockquote {
      margin: 0;
      p {
        font-size: 16px;
      }
    }

    .body {
      margin-top: 20px;
      font-size: 14px;
    }

    .footer {
      margin-top: 20px;
      padding-top: 32px;

      a {
        width: 33.3333%;
        padding: 0 2px;
        button {
          width: 100%;
        }
      }
    }
    .l {
      width: 66.6666%;
      ${flex('center', 'space-between')}
    }
    .l a {
      width: 50%;
      margin-right: 0 !important;
    }
  `)}
`;

const Content: FC<{ className?: string }> = (props) => {
  return <Container {...props} />;
};

export default Content;
