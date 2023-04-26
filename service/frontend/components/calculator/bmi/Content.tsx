import { flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue150,
  AquaBlue50,
  AquaBlue500,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Purple,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  .form {
    width: 300px;

    h4 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .radios {
      margin-bottom: 35px;

      label {
        margin-right: 30px;
      }
    }
    .radios.invalid {
      color: ${AquaBlue};

      .checkbox {
        border-color: ${AquaBlue};
      }
    }
    label {
      position: relative;

      span {
        pointer-events: none;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }

      input {
        width: 100%;
        height: 40px;
        border: 1px solid ${Gray300};
        border-radius: 4px;
        font-size: 14px;
        padding: 0 16px;
        margin-bottom: 4px;
      }
      input.invalid {
        border-color: ${AquaBlue};

        &::placeholder {
          color: ${AquaBlue};
        }
      }
    }
    button {
      margin-top: 14px;
      width: 100%;
      height: 48px;
      color: white;
      background: ${AquaBlue};
      border-radius: 9999px;
      font-weight: 500;
    }
  }
  .result {
    margin-left: 110px;
    width: 400px;

    h4 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .content {
      border: 1px solid ${Gray300};
      border-radius: 8px;
      padding: 54px 73px;

      p {
        font-size: 18px;
        font-weight: 500;

        span {
          display: inline-block;
          font-size: 20px;
          font-weight: 500;
          color: ${Gray200};
        }
      }
      .p2 {
        margin-top: 24px;
        background: no-repeat left center / 34px 34px;
        padding-left: 58px;
      }

      .p1 span {
        width: 96px;
        height: 34px;
        border-bottom: 1px solid ${Gray400};
        text-align: center;
      }
      .p2 span {
        width: 112px;
        height: 34px;
        border-bottom: 1px solid ${Gray400};
        text-align: center;
      }

      button {
        margin-top: 34px;
        width: 160px;
        height: 40px;
        border-radius: 9999px;
        border: 1px solid ${Gray400};
        font-size: 16px;
        font-weight: 500;
        margin-right: 5px;
        ${flexCenter()}
      }
      button:after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/assets/icon_calculator_bmi_reset.svg) no-repeat center;
      }
    }
    .content.bmi-1 {
      border-color: #35d6c6;
      p span {
        color: #35d6c6;
      }
    }
    .content.bmi-2 {
      border-color: ${AquaBlue};
      p span {
        color: ${AquaBlue};
      }
    }
    .content.bmi-3,
    .content.bmi-4,
    .content.bmi-5 {
      border-color: ${Purple};
      p span {
        color: ${Purple};
      }
    }
  }
  .info {
    margin-top: 80px;
    background: ${AquaBlue50};
    border: 1px solid ${AquaBlue150};
    height: 80px;
    ${flexCenter({ direction: 'column' })}

    .p1 {
      color: ${AquaBlue500};
      font-weight: 500;
    }
    .p2 {
      font-size: 14px;
    }
  }
  .info-table {
    h1 {
      margin-top: 80px;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 40px;
    }
    /* img {
      margin-bottom: 24px;
    } */
    p {
      font-size: 14px;
      color: ${Gray500};
    }
  }

  ${mobile(css`
    .control {
      flex-direction: column;

      .form {
        width: 100%;
      }
      .result {
        margin-top: 48px;
        width: 100%;
        margin-left: 0;

        .content {
          padding: 16px;
        }
      }
    }
    .info {
      margin-top: 40px;
      padding: 16px 32px;
      height: unset;
    }

    .info-table {
      h1 {
        margin-top: 40px;
        font-size: 16px;
        margin-bottom: 16px;
      }
      p {
        font-size: 13px;
      }
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
