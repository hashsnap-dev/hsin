import { Column, Row } from '@/layouts/flex-utils';
import { alignItems, desktop, justifyContent, mobile } from '@/styles/utils';
import { Gray300, Gray500, Gray600, Purple } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled(Column)`
  border: 1px solid ${Purple};
  border-radius: 4px;
  background: white;
  align-items: center;

  ${desktop(css`
    margin-top: 56px;
    width: 900px;
    /* height: 500px; */
    padding: 32px 0;

    h5 {
      color: ${Gray600};
      font-size: 20px;
      font-weight: 700;
    }
    img {
      width: initial;
      width: 288px;
      max-height: 196px;
    }
    .VHr {
      border-left: 1px solid ${Gray300};
      height: 538px;
      margin: 0 40px;
    }
    .c1 {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 14px;
        margin-top: 20px;
        color: ${Gray600};
      }
      p.small {
        margin-top: 8px;
        font-size: 10px;
        color: ${Gray500};
        b {
          color: ${Gray500};
          font-weight: 700;
        }
      }
    }
  `)}

  ${mobile(css`
    margin-top: 50px;
    padding: 30px;
    width: 100%;
    ${Row} {
      flex-direction: column;
    }
    h5 {
      font-size: 16px;
    }
    img {
      height: initial;
    }
    hr {
      border: 0;
      border-top: 1px solid ${Gray300};
      width: 90%;
      margin: 30px auto;
    }
    p.small {
      margin-top: 8px;
      font-size: 10px;
      color: ${Gray500};
      b {
        color: ${Gray500};
        font-weight: 700;
      }
    }
  `)}
`;

const RawMaterial: FC<{ className?: string }> = (props) => {
  return <Container {...props} />;
};

export default RawMaterial;
