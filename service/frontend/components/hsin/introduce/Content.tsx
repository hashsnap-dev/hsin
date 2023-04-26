import Link from '@/components/Link';
import { Column } from '@/layouts/flex-utils';
import { alignItems, flex, flexCenter, mobile } from '@/styles/utils';
import { AquaBlue, AquaBlue100, AquaBlue200, AquaBlue550, AquaBlue600, Gray200, Gray300, Gray500 } from '@/styles/variables';
import {FC} from 'react';
import styled, { css } from "styled-components";

const CardContainer = styled(Column)<{primary: string}>`
  border: 1px solid ${Gray300};
  border-radius: 4px;
  width: 294px;
  height: 160px;
  margin-right: 8px;

  .no {
    font-weight: 700;
    color: ${({primary}) => primary};
  }
  .name {
    margin-top: 10px;
    font-weight: 700;
  }
  button {
    margin-top: 16px;
    width: 128px;
    height: 40px;
    border: 1px solid ${({primary}) => primary};
    border-radius: 9999px;
    color: ${({primary}) => primary};
    font-weight: 500;
    transition: background 0.25s;
  }
  &:hover {
    border: 1px solid ${({primary}) => primary};

    button {
      color: white;
      background: ${({primary}) => primary};
    }
  }
`;

export const Card: FC<{
  no: number;
  name: string;
  color: string;
  href: string;
}> = ({no, name, color, href}) => {
  return <Link href={href}>
    <CardContainer primary={color} alignItems="center" justifyContent="center">
      <div className="no">{no.toString().padStart(2, '0')}</div>
      <div className="name font-nanumsquare">{name}</div>
      <button>바로가기</button>
    </CardContainer>
  </Link>

};

const Container = styled.div`
  .header {
    .i1 {
      width: 420px;
      height: 280px;
      background: url(/assets/HSIN_introduce_main_420x280.svg) no-repeat center / contain;
    }
    .r {
      padding-top: 30px;
      text-align: center;
      margin-left: 80px;

      .i2 {
        display: inline-block;
        width: 152px;
        height: 42px;
        background: url(/assets/image_hsin_i2.svg) no-repeat center/ contain;
      }

      .p1 {
        margin-top: 24px;
        font-size: 18px;
        font-weight: 700;

        b {
          font-weight: 800;
          color: ${AquaBlue600};
        }
      }
      .p2 {
        margin-top: 40px;
        font-size: 18px;
      }
    }
  }
  .content {
    h1 {
      margin-top: 80px;
      font-size: 24px;
      font-weight: 500;
      color: ${AquaBlue550};
    }
    .sub-title {
      margin-top: 32px;
      border-left: 4px solid ${Gray200};
      height: 46px;
      padding-left: 10px;
      margin-bottom: 16px;
      justify-content: center;

      h2 {
        font-size: 20px;
        font-weight: 500;
      }
      p {
        color: ${Gray500};
      }
    }

    .data {
      margin-top: 40px;
      align-items: center;
    }
    .i3 {
      width: 403px;
      height: 183px;
      background: url(/assets/image_hsin_i3.svg) no-repeat center / contain;
    }
    table {
      flex: 1;
      margin-left: 100px;
      border-collapse: collapse;

      thead tr {
        height: 30px;
        /* background: ${AquaBlue100}; */

      }
      thead tr th {
        font-size: 18px;
        font-weight: 500 !important;
      }
      th:first-child {
        width:145px;
      }
      th {
        text-align: left;
        /* border: 1px solid ${AquaBlue200}; */
        color: ${AquaBlue};
      }

      td {
        padding-top: 10px;
        /* height: 75px; */
        /* border: 1px solid ${Gray300}; */
        /* padding: 0 16px; */
        font-size: 14px;
        span {
          color: ${Gray500};
        }
      }
    }
  }

${mobile(css`
  .header {
    width: 100%;
    flex-direction: column;

    .i1 {
      width: 100%;
      /* height: 200; */
    }

    .r {
      margin-left: 0;

      .i2 {
        width: 137px;
        height: 38px;
      }
      .p1 {
        margin-top: 20px;
        font-size: 16px;
      }
      .p2 {
        font-size: 16px;

        br {
          display: none;
        }
      }
    }
  }
  .content {
    h1 {
      font-size: 18px;
    }
    .sub-title {
      margin-top: 16px;
      height: unset;

      h2 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .cards {
      flex-wrap: wrap;

      a {
        width: 50%;
        padding: 2px;
      }
      ${CardContainer} {
        width: 100%;
        padding: 16px;
      }
    }
  }
  .data {
    flex-direction: column;

    .i3 {
      width: 100%;
      height: 162px;
    }
    table {
      margin: 0;
      margin-top: 32px;

      thead tr th:first-child {
        width: unset;
      }
      thead {
        display: none;
      }
      tbody tr {
        ${flex('stretch', 'start', {direction: 'column'})}
      }
      tbody tr td {
        padding: 0;
        padding-bottom: 12px;
        border: 0;
        height: unset;
        /* box-shadow: inset 0 0 0 1px ${Gray300}; */
        p {
          padding: 0 16px;
        }
      }
      td:nth-child(1):before {
        content: '민간데이터';
        display: block;
        width: 100%;
        color: ${AquaBlue};
        font-weight: 500;
        margin-bottom: 10px;
      }
      td:nth-child(2):before {
        content: '공공데이터(식약처 데이터활용서비스 등)';
        display: block;
        width: 100%;
        color: ${AquaBlue};
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }
`)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};



export default Content;