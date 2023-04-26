import ContentSection, {
  Content as ContentSectionContent,
} from '@/components/ContentSection';
import { FlexGridContaier, FlexGridItem } from '@/components/FlexGrid';
import Link from '@/components/Link';
import { flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue50,
  AquaBlue500,
  AquaBlue600,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TabContentContainer } from './TabContent';

const Container = styled.div`
  ${FlexGridContaier} {
    margin-top: 40px;
  }
  .explanation {
    height: 64px;
    font-size: 18px;
    width: 1232px;
    margin: auto;
    padding: 0 16px;
    div {
      position: relative;
      width: 100%;
      height: 100%;
      background: ${AquaBlue50};
    }
    b {
      font-weight: 500;
      color: ${AquaBlue};
    }
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      background: ${AquaBlue};
      border: 1px solid ${AquaBlue500};
      border-radius: 4px;
      color: white;
      width: 160px;
      height: 36px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .t1 {
    h1 {
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 700;
      color: ${AquaBlue};
    }
    h2 {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 700;
    }
    h3 {
      margin-top: 5px;
      font-size: 15px;
      font-weight: 700;
    }
    p {
      margin-top: 5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 40px 0;
      td {
        width: 50%;
        height: 40px;
        font-size: 14px;
        border: 1px solid ${Gray300};
        text-align: center;
      }
      td:first-child {
        font-weight: 700;
        background: ${Gray100};
      }
    }
  }
  .graph {
    background: no-repeat center;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .t2 {
    border: 1px solid ${Gray300};
    width: 100%;
    padding: 100px 0;

    p {
      width: 968px;
    }
  }
  .t2,
  .t3,
  .t4,
  .t5,
  .t6,
  .t7 {
    p {
      font-size: 15px;
      color: ${Gray400};
      margin: 0 auto;
      text-align: right;
      padding: 0 16px;
    }
    .extra {
      font-size: 14px;
      color: ${AquaBlue};
      padding: 0 16px;
    }
  }
  .t2 .graph {
    width: 968px;
    height: 447px;
  }
  .t3 .graph {
    width: 1202px;
    height: 466px;
  }
  .t4 .graph {
    width: 1202px;
    height: 6122px;
  }
  .t5 .graph {
    width: 1201px;
    height: 466px;
  }
  .t6 .graph {
    width: 1202px;
    height: 467px;
  }
  .t7 .graph {
    width: 1202px;
    height: 468px;
  }
  ${mobile(css`
    ${FlexGridItem} {
      width: 100%;
    }
    .t2 .graph {
      width: 659px;
      height: 438px;
      background-image: url(/assets/image_mobile_adverse_case_i1.svg);
    }
    .t3 .graph {
      width: 1202px;
      height: 466px;
    }
    .t4 .graph {
      width: 1202px;
      height: 6122px;
    }
    .t5 .graph {
      width: 1201px;
      height: 466px;
    }
    .t6 .graph {
      width: 1202px;
      height: 467px;
    }
    .t7 .graph {
      width: 1202px;
      height: 468px;
    }
    .explanation {
      width: 100%;
      height: unset;
      div {
        background: none;
        flex-direction: column;
      }
      button {
        margin-top: 16px;
        position: static;
        transform: initial;
      }
    }
    .t2 {
      border: 0;
      padding: 0;
      p {
        width: 100%;
      }
    }
    .mobile-wrapper {
      left: 0;
      top: 0;
      width: 100%;
      overflow-x: scroll;
      padding: 0 16px;
      ::-webkit-scrollbar {
        height: 0px;
      }
    }
    .t1 {
      padding: 0 16px;
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
