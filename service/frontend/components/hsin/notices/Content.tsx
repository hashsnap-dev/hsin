import Dropdown, { SelectContainer } from '@/components/Dropdown';
import { alignItems, flexCenter, mobile } from '@/styles/utils';
import {
  Gray100,
  Gray200,
  Gray300,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${SelectContainer} {
    width: 118px;
    margin: 16px 0 0 auto;
    .custom__control {
      border: 1px solid ${Gray300};
      border-radius: 4px;
      height: 30px;
      font-size: 14px;
      font-weight: 500;
    }
    .custom__single-value {
      padding-left: 16px;
    }
  }
  .board {
    margin-top: 16px;
    width: 100%;

    .head {
      width: 100%;
      height: 28px;
      font-size: 12px;
      border-top: 1px solid ${Gray600};
      border-bottom: 1px solid ${Gray300};
      background: ${Gray100};

      > div {
        ${flexCenter()}
      }
    }
    .no {
      width: 120px;
      ${flexCenter()}
    }
    .title {
      flex: 1;
      ${alignItems('center')}
    }
    .author {
      width: 140px;
      ${flexCenter()}
    }
    .date {
      width: 120px;
      ${flexCenter()}
    }
    .views {
      width: 120px;
      ${flexCenter()}
    }
    .row {
      .date,
      .views {
        font-weight: 300;
        color: ${Gray500};
      }
    }

    .row {
      font-size: 14px;
      height: 56px;
      border-bottom: 1px solid ${Gray300};
    }
    .row.notice {
      background: ${Gray100};
      border-bottom: 1px solid ${Gray200};

      .no,
      .title {
        font-weight: 500;
      }
      .date,
      .views {
        font-weight: 400;
        color: ${Gray600};
      }
    }
  }

  ${mobile(css`
    .board {
      .head {
        display: none;
      }
      .row {
        position: relative;
        display: block;
        height: unset;
        padding: 16px 16px 48px 16px;
      }
      .row.notice:before {
        position: absolute;
        content: '공지';
        display: inline-block;
        font-size: 10px;
        font-weight: 500;
        width: 33px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid ${Gray600};
        ${flexCenter()}
      }
      a:nth-of-type(1) .row {
        border-top: 1px solid ${Gray600};
      }
      .no {
        display: none;
      }
      .title {
        display: block;
        font-size: 14px;
        font-weight: 500;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .row.notice {
        .title {
          padding-left: 48px;
        }
      }
      .author {
        display: none;
      }
      .date {
        position: absolute;
        bottom: 16px;
        left: 16px;
        justify-content: start;
        font-size: 12px;
      }
      .date:before {
        content: '등록일';
        margin-right: 5px;
      }
      .views {
        position: absolute;
        bottom: 16px;
        right: 16px;
        justify-content: end;
        font-size: 12px;
      }
      .views:before {
        content: '조회수';
        margin-right: 5px;
      }
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
