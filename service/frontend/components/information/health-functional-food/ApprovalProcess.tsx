import { Row } from '@/layouts/flex-utils';
import { alignItems, desktop, mobile } from '@/styles/utils';
import { AquaBlue300, Gray500, Gray600 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  margin-top: 56px;

  h4 {
    font-size: 20px;
    font-weight: 500;
    color: ${Gray600};
  }
  h5 {
    margin-top: 28px;
    font-size: 18px;
    font-weight: 700;
    color: ${Gray600};
  }
  .c1 {
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
  }
  .c2 {
    width: 244px;
    height: 360px;
    border: 1px solid ${AquaBlue300};
    border-radius: 4px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 37px 0 0 0;

    p,
    ul {
      text-align: left;
      margin-top: 26px;
      color: ${Gray500};
      font-size: 15px;
    }
    ul {
      padding-left: 15px;

      li {
        display: list-item;
      }
    }
  }
  p {
    margin-top: 28px;
    font-size: 20px;
    color: ${Gray500};
  }
  ${desktop(css`
    .c1 {
      width: 1000px;
    }
  `)}
  ${mobile(css`
    h4 {
      font-size: 16px;
    }
    .c1 {
      align-items: center;
      flex-direction: column;
    }
    .c2 {
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
    }
  `)}
`;

const ApprovalProcess: FC<{ className?: string }> = (props) => {
  return <Container {...props} />;
};

export default ApprovalProcess;

export const ApprovalProcessHeader = styled.div`
  ${alignItems('center')}
  text-align: left;

  ${mobile(css`
    flex-direction: column;
    text-align: center;
    ${Row} {
      flex-direction: column;
    }
  `)}
`;
