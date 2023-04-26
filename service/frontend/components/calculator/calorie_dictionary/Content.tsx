import { FlexGridContaier, FlexGridItem } from '@/components/FlexGrid';
import Link from '@/components/Link';
import { flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue600,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Item, Row } from '@/layouts/flex-utils';

const Container = styled.div`
  ${FlexGridContaier} {
    margin-top: 40px;
  }
  .no {
    width: 100px;
  }

  .header {
    margin-top: 18px;

    .row {
      font-size: 12px;
      font-weight: 500;
      background: ${Gray100};
      border-top: 1px solid ${Gray600};
      border-bottom: 1px solid ${Gray300};
      min-height: 28px;

      ${Item} {
        ${flexCenter()}
      }
    }
  }
  .category {
    width: 150px;
  }
  .name {
    flex: 1;
  }

  .calorie {
    width: 100px;
  }
  /* .calorie:after {
    content: ''
  } */

  .content {
    ${Item} {
      ${flexCenter()}
    }
    .row {
      min-height: 56px;
      font-size: 14px;
      border-bottom: 1px solid ${Gray300};
    }
    .name {
      justify-content: start;
    }

    .empty {
      width: 100%;
      height: 336px;
      ${flexCenter()}
    }
  }

  ${mobile(css`
    ${FlexGridItem} {
      width: 100%;
    }
    .header {
      /* display: none; */
      .row {
      }
    }
    .content {
      .row {
        /* height: initial; */
      }
    }
    .name {
      min-width: 120px;
    }
    .no {
      display: none !important;
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
