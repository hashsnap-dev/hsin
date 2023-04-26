import { MoveButtonContainer } from '@/components/MoveButton';
import { Row } from '@/layouts/flex-utils';
import { alignItems, flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue500,
  AquaBlue600,
  Gray200,
  Gray300,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const MaterialContentContainer = styled.div`
  .header {
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${Gray200};

    h2 {
      ${alignItems('center')}
      font-size: 16px;
      font-weight: 500;
      color: ${AquaBlue600};

      span {
        margin-left: 8px;
        height: 22px;
        font-size: 12px;
        font-weight: 700;
        color: ${AquaBlue600};
        border: 1px solid ${AquaBlue600};
        border-radius: 2px;
        padding: 0 4px;
      }
    }
    h1 {
      margin-top: 8px;
      font-size: 28px;
      font-weight: 500;
    }

    a {
      width: 180px;
      height: 40px;
      border: 1px solid ${Gray300};
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      ${flexCenter()}
      margin-left: 4px;
    }
  }
  .content {
    h4 {
      font-weight: 700;
      margin-top: 32px;
      margin-bottom: 8px;
    }
    p {
      margin: 4px 0;
    }
    .depth-1 {
      padding-left: 1em;
    }
    .depth-2 {
      padding-left: 2em;
    }
    .depth-3 {
      padding-left: 3em;
    }
    pre {
      white-space: pre-wrap;
    }
    .shortcut {
      margin-top: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid ${Gray300};

      a {
        font-weight: 500;
        width: 380px;
        height: 48px;
        border-radius: 4px;
        border: 1px solid ${Gray300};
        color: ${AquaBlue500};
        ${flexCenter()}
        margin-right: 4px;
      }
      a:after {
        content: '';
        display: block;
        background: url(/assets/icon_product_detail_i2.svg) no-repeat center;
        width: 12px;
        height: 12px;
        margin-left: 6px;
      }
    }
    .goto {
      margin-top: 56px;
    }

    ul,
    ol {
      li {
        display: list-item;
      }
    }
  }

  ${mobile(css`
    .header {
      margin-top: 30px;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h1 {
        margin-top: 8px;
        font-size: 20px;
      }

      .extra {
        margin-top: 36px;
      }
    }
    .content {
      font-size: 14px;

      .shortcut {
        flex-direction: column;
        border: 0;
        padding: 0;

        a {
          margin: 0;
          margin-top: 4px;
          width: 100%;
        }
      }
      .goto {
        margin-top: 64px;
        gap: 4px;

        ${MoveButtonContainer} {
          width: 100%;
        }

        > ${Row} {
          flex: 2;
          gap: 4px;

          a {
            width: 100%;
          }
        }
        > a {
          flex: 1;
        }
      }
    }
  `)}
`;

const MaterialContent: FC<{}> = (props) => {
  return <MaterialContentContainer {...props} />;
};

export default MaterialContent;
