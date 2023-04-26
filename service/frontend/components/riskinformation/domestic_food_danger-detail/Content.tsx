import { desktop, flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue100,
  AquaBlue150,
  AquaBlue200,
  AquaBlue50,
  AquaBlue500,
  AquaBlue550,
  Gray100,
  Gray200,
  Gray300,
  Gray500,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  .header {
    .thumbnail {
      width: 414px;
      height: 414px;
      background: no-repeat center / contain;
      border: 1px solid ${Gray300};
      border-radius: 4px;
    }
    .thumbnail-change {
      margin-left: 20px;

      button {
        margin-bottom: 6px;
        width: 64px;
        height: 64px;
        background: no-repeat center / contain;
        border: 1px solid ${Gray300};
        border-radius: 4px;
      }
      .current {
        border: 1px solid ${AquaBlue};
      }
    }
    .content {
      margin-left: 118px;

      h2 {
        font-size: 16px;
        font-weight: 500;
        color: ${AquaBlue550};
      }
      h1 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 32px;
      }
      h3 {
        font-size: 16px;
        font-weight: 500;

        span {
          margin-left: 14px;
          font-size: 14px;
          font-weight: 400;
          color: ${Gray500};
        }
      }

      .box {
        margin-top: 10px;
        background: ${Gray100};
        border: 1px solid ${Gray200};
        padding: 20px 16px;
        margin-bottom: 24px;
        dl {
          margin-top: 5px;
          display: flex;
          flex-wrap: wrap;
        }
        dt,
        dd {
          display: inline-block;
          font-size: 14px;
        }
        dt {
          width: 128px;
          font-weight: 500;
        }
        dd {
          width: 420px;
          color: ${Gray500};
          margin: 0;
        }
      }
    }
  }
  .content {
    flex: 1;

    h4 {
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
      color: ${AquaBlue550};
    }
    p {
      line-height: 2em;
      color: ${Gray500};
    }
    strong {
      margin-top: 32px;
      display: block;
      font-weight: 500;
      color: ${AquaBlue500};
      background: ${AquaBlue50};
      border: 1px solid ${AquaBlue150};
      padding: 10px 0;
      text-align: center;
    }
  }

  .goto {
    margin-top: 64px;
    width: 100%;
    padding-top: 56px;
    border-top: 1px solid ${Gray300};
  }

  ${mobile(css`
    .header {
      flex-direction: column;

      .content {
        h2 {
          font-size: 14px;
        }
        h1 {
          font-size: 20px;
          margin-bottom: 20px;
        }

        dd {
          margin-bottom: 8px !important;
        }
      }

      .thumbnail-container {
        flex-direction: column;
      }
      .thumbnail {
        width: 100%;
        height: 300px;
      }
      .thumbnail-change {
        flex-direction: row;
        margin: 0;
        margin-top: 10px;
        button {
          margin-right: 10px;
        }
      }
      .content {
        margin: 0;
        margin-top: 10px;
      }
    }
    .header .content .box dt {
      width: 90px;
    }
    .content {
      p {
        font-size: 14px;
      }
      strong {
        font-size: 14px;
      }
    }
    .goto {
      margin-top: 16px;
      padding-top: 32px;
    }
  `)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;
