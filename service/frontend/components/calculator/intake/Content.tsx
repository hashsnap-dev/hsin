import Link from '@/components/Link';
import Flex, { Column, Row } from '@/layouts/flex-utils';
import {
  alignItems,
  desktop,
  flex,
  flexCenter,
  justifyContent,
  mobile,
} from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue500,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { SelectContainer } from '../../Dropdown';
import { FoodCardContainer, FoodItemContainer } from './FoodCard';

export const Material = styled(Link)<{ borderColor: string; color: string }>`
  /* margin-top: 10px; */
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ color }) => color};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 9999px;
  height: 30px;
  padding: 3px 12px 0 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${desktop(css`
    max-width: 400px;
  `)}
  ${mobile(css`
    max-width: 100%;
  `)}
`;

const Container = styled.div`
  margin-top: 24px;

  .search-container {
    .search-panel {
      border: 1px solid ${Gray300};
      border-radius: 4px;
      ${flex('stretch', 'start', { direction: 'column' })}
      height: 483px;
      overflow: hidden;
    }
    .tab-desktop {
      border-bottom: 1px solid ${Gray300};
      height: 56px;
      font-size: 14px;
      /* padding: 0 16px; */

      ${flex()}

      &>div {
        flex: 1;
        user-select: none;
        cursor: pointer;
        position: relative;
        border-left: 1px solid ${Gray200};
        padding: 0 8px;

        ${flexCenter()}
      }
      & > div:first-child {
        border-left: 0;
      }
      .current {
        background: ${Gray100};
        color: ${AquaBlue};
        font-weight: 500;
      }
      .current:before {
        position: absolute;
        content: '';
        bottom: 0;
        width: 100%;
        height: 2px;
        background: ${AquaBlue};
      }
    }
    .tab-mobile {
      height: 56px;
      font-size: 14px;
      padding: 0 16px;

      ${flex()}

      &>div {
        text-align: center;
        user-select: none;
        cursor: pointer;
        position: relative;
        padding: 0 8px;

        ${flexCenter()}
      }
      & > div:first-child {
        border-left: 0;
      }
      .current {
        color: ${AquaBlue};
        font-weight: 500;
      }
    }
    .input-wrapper {
      padding: 12px;
      border-bottom: 1px solid ${Gray300};
      ${SelectContainer}, input {
        width: 100%;
        font-size: 15px;
        border: 1px solid ${Gray600};
        border-radius: 4px;
        height: 40px;
        padding: 0 20px;
      }

      input {
        background: url(/assets/icon_intake_search.svg) no-repeat right 8px
          center;
      }
    }
    .input-wrapper.hide {
      display: none;
    }

    .search-result {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      .empty {
        width: 100%;
        height: 100%;
        ${flexCenter()}
      }

      ::-webkit-scrollbar {
        width: 10px;
        padding-right: 10px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 9999px;
        background: ${Gray200};
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 9999px;
        background: ${Gray300};
      }
    }

    > h4 {
      position: relative;
      margin-top: 20px;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;

      button {
        font-size: 14px;
        position: absolute;
        right: 0;
      }
    }
    .list {
      margin-top: 14px;
      border: 1px solid ${Gray300};
      border-radius: 4px;
      font-size: 14px;
      color: ${Gray500};
      height: 108px;
      ${flexCenter()}
    }
  }

  .result {
    width: 680px;
    flex-direction: column;
    ${alignItems('center')}

    .box {
      position: relative;
      color: white;
      font-weight: 700;
      background: ${AquaBlue};
      width: 144px;
      height: 44px;
      ${flexCenter()}
      border-radius: 9999px;
    }
    .box:before {
      position: absolute;
      content: '';
      display: block;

      border-left: 18px solid ${AquaBlue};
      border-right: 18px solid transparent;
      border-bottom: 18px solid transparent;
      bottom: -18px;
      transform: translateX(25%);
    }

    h1 {
      margin: 0;
      margin-top: 30px;
      font-size: 24px;
      font-weight: 400;
      text-align: center;

      b {
        color: ${AquaBlue};
        font-weight: 500;
      }
    }
    h2 {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 400;
      color: ${Gray400};
    }
    .placeholder {
      background: url(/assets/HSIN_IMG_Noresult_540x250.svg) no-repeat center;
      width: 100%;
      height: 358px;
      text-align: center;
      padding-top: 350px;
      filter: grayscale(1);

      span {
        color: ${Gray400};
        font-size: 13px;
      }
    }

    .warn {
      margin-top: 80px;
      width: 100%;
      height: 0;
      min-height: 170px;
      border: 1px solid ${Gray300};
      border-radius: 8px;
      ${flexCenter()}

      .image {
        margin-right: 27px;
        width: 77px;
        height: 90px;
        background: url(/assets/image_calculator_warn.svg) no-repeat center /
          contain;
      }

      .p2 {
        font-size: 14px;
        color: ${Gray400};
      }
      a {
        ${flexCenter()};
        display: inline-flex;
        margin-top: 5px;
        margin-right: 8px;
        width: 110px;
        height: 32px;
        color: ${AquaBlue};
        font-size: 14px;
        font-weight: 500;
        border: 1px solid ${AquaBlue};
        border-radius: 4px;
      }
    }
    .tab {
      margin-top: 40px;
      width: 100%;
      height: 36px;
      border-bottom: 2px solid ${Gray200};
      margin-bottom: 64px;

      & > div {
        cursor: pointer;
        user-select: none;
        position: relative;
        text-align: center;
        flex: 1;
        font-size: 18px;
        font-weight: 700;
      }
      .current:before {
        position: absolute;
        content: '';
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background: ${AquaBlue};
      }
    }

    h4 {
      width: 100%;
      text-align: left;
      font-size: 18px;
      font-weight: 700;
      background: url(/assets/icon_calculator_title.svg) no-repeat left center;
      padding-left: 30px;
    }

    .dup-mats {
      margin-top: 10px;
      border-radius: 4px;
      width: 100%;
      padding: 40px 24px;
      background: ${Gray100};
      margin-bottom: 64px;
      .dup-mats-title {
        margin-right: 10px;
      }
      .mats-list {
        display: inline-block;
      }
      .empty {
        text-align: center;
      }

      p {
        margin-bottom: 10px;
      }
      .recommended-intake {
        margin-top: 40px;

        .title {
          margin-bottom: 12px;

          h5 {
            font-size: 16px;
            font-weight: 700;
          }
          span {
            font-size: 14px;
            color: ${Gray400};
          }
        }
      }

      ${Material} {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }

    .dup-mats-detail {
      margin-top: 10px;
      width: 100%;
      border: 1px solid ${Gray300};
      border-radius: 4px;
      ${flexCenter({ wrap: 'wrap' })}
    }
    .dup-mats-detail-list {
      width: 100%;

      h5 {
        margin-top: 40px;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 10px;
      }

      ${Material} {
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }

    .add-product {
      margin-top: 43px;
      font-weight: 500;
      width: 100%;
      ${flexCenter()}
      height: 48px;
      border-radius: 4px;
      border: 1px solid ${Gray300};
    }

    .dup-func {
      margin-top: 10px;
      border-radius: 4px;
      width: 100%;
      padding: 40px 24px;
      background: ${Gray100};
      margin-bottom: 64px;
      text-align: center;

      b {
        display: block;
        color: ${AquaBlue};
        font-size: 18px;
        font-weight: 500;
      }
    }
    .dup-func-detail-list {
      width: 100%;

      .func-detail-item {
        ${flex('center', 'start')}
        width: 100%;
        min-height: 120px;
        border-bottom: 1px solid ${Gray200};
      }

      .thumbnail {
        width: 110px;
        height: 110px;
        background: no-repeat center;
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        color: ${AquaBlue};
      }
      .title:after {
        margin-left: 10px;
        content: '중복';
        font-size: 14px;
        font-weight: 400;
        color: ${Gray500};
      }
      .foods {
        margin-top: 10px;

        > a {
          margin-right: 6px;
          margin-bottom: 6px;
          position: relative;
          display: inline-block;
          border-radius: 4px;
          border: 1px solid ${Gray300};
          height: 34px;
          font-size: 14px;
          padding: 0 26px;
          button {
            width: 100%;
            height: 100%;
          }
          span {
            display: none;
          }
          &:hover {
            background: ${Gray100};
          }
          &:hover span {
            display: block;
            font-size: 12px;
            height: 28px;
            position: absolute;
            background: white;
            border-radius: 4px;
            border: 1px solid ${Gray300};
            padding: 2px 16px;
            left: 85%;
            top: -25%;
            white-space: nowrap;
            z-index: 1;
            box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.125);
          }
        }
      }
    }
  }
  .mobile-search-panel {
    display: none;
  }

  ${mobile(css`
    .mobile-search-panel {
      display: flex;
    }
    .result {
      .dup-mats {
        text-align: center;

        .mats-list {
          margin-top: 10px;
          width: 100%;
        }
      }
    }
    .product-list {
      border-top: 1px solid ${Gray200};
      width: 50%;
      height: 56px;
      background: ${Gray100};
      border-bottom: 1px solid ${Gray200};
      &.current {
        background: white;
        border-right: 1px solid ${Gray200};
        border-bottom: 0;
      }
    }
    .product-manage {
      border-top: 1px solid ${Gray200};
      width: 50%;
      height: 56px;
      background: ${Gray100};
      border-bottom: 1px solid ${Gray200};
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &.current {
        background: white;
        border-left: 1px solid ${Gray200};
        border-bottom: 0;
      }

      .number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        color: ${AquaBlue};
        border: 2px solid ${AquaBlue};
        font-size: 11px;
        font-weight: 700;
        border-radius: 9999px;
        margin-left: 8px;
      }
    }
    .recommended-intake {
      span {
        /* display: none; */
      }

      ${Row}.title {
        flex-direction: column;
      }
    }
    .result {
      width: 100%;

      .box {
        font-size: 14px;
      }
      .mobile {
        width: 100%;
        text-align: center;
      }
      .warn {
        margin-top: 64px;
        padding: 16px;
        font-size: 14px;
        height: 100px;
      }
      h1 {
        font-size: 18px;
      }
      h2 {
        font-size: 14px;
      }
      .placeholder {
        background-size: 75%;
        height: initial;
      }
      > .tab div {
        font-size: 15px;
      }
      > h4 {
        font-size: 16px;
      }

      .check-added-product {
        margin-top: 14px;
        color: ${AquaBlue};
        font-size: 14px;
        font-weight: 500;
        text-decoration: underline;
      }

      .func-detail-item {
        flex-direction: column;
        padding-bottom: 16px;
        height: initial !important;

        .thumbnail {
          width: 64px;
          height: 64px;
        }

        ${Column} {
          justify-content: center;
        }

        .title,
        .foods {
          text-align: center;
        }
        .title {
          font-size: 16px;
        }
        .foods a {
          padding: 0 8px;
        }
      }
    }
    button.open-list {
      position: fixed;
      width: 48px;
      height: 48px;
      right: 10px;
      z-index: 3;
      bottom: 62px;
      border-radius: 4px;
      background: url(/assets/icon_mobile_intake_list.svg) ${AquaBlue} no-repeat
        center;
      z-index: 1;

      span {
        display: inline-block;
        background: white;
        border-radius: 9999px;
        width: 20px;
        height: 20px;
        border: 2px solid ${AquaBlue};
        color: ${AquaBlue};
        ${flexCenter()}
        font-size: 11px;
        font-weight: 700;
        transform: translate(20px, -10px);
      }
    }
    .mobile-search-panel {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: white;
      left: 0;
      top: 0;

      h1 {
        min-height: 60px;
        ${flexCenter()}
        font-size: 16px;
        font-weight: 500;
        > .close {
          position: absolute;
          right: 20px;
          top: 14px;
          width: 32px;
          height: 32px;
          background: url(/assets/icon_mobile_intake_close.svg) no-repeat center;
        }
      }
      .search-container {
        width: 100%;
        height: 0;
        flex: 1;
        display: flex;
        flex-direction: column;

        .tab {
          font-size: 14px;
        }

        .search-panel {
          border: 0;
          height: 100%;
          .input-wrapper {
            border-bottom: 0;
          }

          .content h4 {
            font-size: 14px;
          }
        }
        .search-end {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;

          button {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background: ${AquaBlue};
            border: 1px solid ${AquaBlue500};
            color: white;
            font-weight: 500;
          }
        }
        .search-result::-webkit-scrollbar {
          width: 0;
        }
        .mobile-list {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: white;

          .clear-list {
            text-align: right;
            margin-right: 20px;
            font-size: 14px;
          }
          .list {
            flex: 1;
            ${justifyContent('start', { direction: 'column' })}

            overflow: auto;
            font-size: 16px;
            font-weight: 500;
            border: 0;
            padding: 0 20px;
            padding-bottom: 100px;

            > button {
              width: 100%;
              height: 108px;
              ${flexCenter()}
              border-radius: 4px;
              border: 1px solid ${Gray300};
            }
          }
        }
      }
    }
  `)}
`;

export const DupDetail = styled.div<{ color: string }>`
  font-size: 14px;
  padding: 12px;

  &:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background: ${({ color }) => color};
    margin-left: 20px;
    margin-right: 5px;
  }
`;

const IntakeBoxContainer = styled(Row)`
  margin-top: 4px;
  width: 100%;
  min-height: 48px;
  background: white;
  border: 1px solid ${Gray300};
  border-radius: 4px;
  padding: 10px 24px;
  ${alignItems('stretch')}
  text-align: left;
  .no {
    min-width: 33px;
    color: ${AquaBlue};
    border-right: 1px solid ${Gray300};
    margin-right: 24px;
    ${alignItems('center')}
  }
  .name {
    flex: 1;
    white-space: nowrap;
  }
  .capacity {
    font-weight: 500;
  }

  ${mobile(css`
    font-size: 14px;

    ${Flex} {
      flex-direction: column;
    }

    .name {
      white-space: initial;
    }
    .capacity {
      text-align: right;
    }
  `)}
`;

export const IntakeBox: FC<{
  no: number;
  name: string;
  capacity: string;
}> = ({ no, name, capacity }) => {
  return (
    <IntakeBoxContainer>
      <div className="no">{no}</div>
      <Flex flexWrap="wrap" justifyContent="space-between" flex="1">
        <div className="name">{name}</div>
        <div className="capacity">{capacity}</div>
      </Flex>
    </IntakeBoxContainer>
  );
};

const Content: FC<any> = (props) => {
  return <Container {...props} />;
};

export default Content;
