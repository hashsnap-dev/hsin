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

  ${FlexGridContaier} {
    margin-top: 40px;
  }
`;

export const Card = styled(Link)`
  height: 100%;
  border: 1px solid ${Gray300};
  border-radius: 4px;
  text-align: left;

  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    /* padding: 20px; */
    border-bottom: 1px solid ${Gray300};
  }
  .thumbnail {
    width: 100%;
    padding-bottom: 100%;
    background: no-repeat center / contain;
  }
  .content {
    padding: 16px;
  }
  .title {
    margin-bottom: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .date,
  .views {
    font-size: 14px;
    color: ${Gray400};
  }

  ${mobile(css`
    height: initial;
    .title {
      line-height: 1.2em;
      height: 2.4em;
      margin-bottom: 8px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: initial;
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
