import { FlexGridContaier } from '@/components/FlexGrid';
import Link from '@/components/Link';
import { mobile } from '@/styles/utils';
import {
  AquaBlue,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  text-align: center;

  .primary {
    margin-top: 32px;
    font-size: 18px;

    b {
      font-weight: 500;
      color: ${AquaBlue};
    }
  }
  .sub {
    margin-top: 10px;
    font-size: 16px;
    color: ${Gray400};
  }
  .box {
    margin-top: 16px;
    display: inline-block;
    background: ${Gray100};
    border: 1px solid ${Gray200};
    border-radius: 9999px;
    color: ${Gray500};
    font-size: 12px;
    padding: 4px;
  }

  ${FlexGridContaier} {
    margin-top: 40px;
  }

  ${mobile(css`
    .primary,
    .sub {
      font-size: 13px;
    }
    .box {
      font-size: 12px;
    }
  `)}
`;

export const Card = styled(Link)`
  height: 400px;
  border: 1px solid ${Gray300};
  border-radius: 4px;
  text-align: left;

  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    padding: 20px;
    border-bottom: 1px solid ${Gray200};
  }
  .thumbnail {
    width: 100%;
    padding-bottom: 100%;
    background: no-repeat center / contain;
  }
  .content {
    padding: 16px;
  }
  .name {
    margin-bottom: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .company,
  .date {
    font-size: 14px;
    color: ${Gray500};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${mobile(css`
    height: initial;
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
