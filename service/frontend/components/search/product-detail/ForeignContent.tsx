import {
  AquaBlue,
  AquaBlue300,
  AquaBlue50,
  AquaBlue500,
  AquaBlue600,
  CyanBlue500,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Gray500,
  Gray550,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { desktop, flex, flexCenter, mobile } from '@/styles/utils';

const Container = styled.div`
  margin-top: 40px;

  > .header {
    display: flex;
    justify-content: space-between;

    .thumbnail {
      width: 400px;
      height: 320px;
      background-repeat: no-repeat, no-repeat;
      background-position: center, center;
      background-size: cover, 75%;
      border: 1px solid ${Gray300};
      border-radius: 8px;
    }

    .content {
      flex: 1;

      h2 {
        font-size: 16px;
        font-weight: 500;
        color: ${AquaBlue600};
      }
      h1 {
        font-size: 24px;
        font-weight: 500;
        color: ${Gray600};
      }

      .sub-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid ${Gray200};
        padding-bottom: 20px;

        .title { flex: 1; }
      }
      .sub-header button {
        border: 1px solid ${CyanBlue500};
        border-radius: 4px;
        color: ${CyanBlue500};
        background: transparent;
        width: 120px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .3s, color .3s;
        
        &:before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url(/assets/icon_product_heart.svg) no-repeat;
        }

        
        &.hearted {
          color: white;
          background:  ${CyanBlue500};

          &:before {
            background-image: url(/assets/icon_product_heart_selected.svg);
          }
        }
      }

      .brief1 {
        flex: 1;
        margin-top: 16px;
        display: flex;

        h4 {
          margin-bottom: 12px;
          font-weight: 500;
          color: ${Gray600};
        }
        .functionalities p {
          font-size: 15px;
          color: ${Gray550};
        }
        .functionalities button {
          cursor: default;
          margin-top: 10px;
          font-size: 12px;
          font-weight: 700;
          padding: 0;
        }
        .materials {
          flex: 1;

          a {
            display: inline-block;
          }
        }
      }
      .c1 {
        ${flex()}
        margin-top: 40px;

        a {
          flex: 1;
          height: 48px;
          border-radius: 4px;
          font-weight: 500;
          ${flexCenter()}
        }
        button {
          flex: 1;
        }
        a button {
          width: 100%;
          height: 100%;
        }
        .b1 {
          color: white;
          background: ${AquaBlue};
          border: 1px solid ${AquaBlue500};
          .icon {
            background: url(/assets/icon_product_detail_i1.svg) no-repeat center;
          }
        }
        .b2 {
          color: ${Gray400};
          border: 1px solid ${Gray400};
        }
        a .b2 {
          height: 48px;
          color: ${AquaBlue500};
          border: 1px solid ${AquaBlue500};
          .icon {
            background: url(/assets/icon_product_detail_i2.svg) no-repeat center;
          }
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 6px;
        }
      }
    }
  }
  .articles {
    margin-top: 80px;
    padding: 20px 16px;
    background: ${Gray100};
    border: 1px solid ${Gray200};
    li {
      position: relative;
      display: list-item;
      margin: 4px;
      margin-left: 20px;

      time {
        position: absolute;
        font-size: 14px;
        color: ${Gray400};
        right: 0;
      }
    }
  }
  .goto-list {
    width: 120px;
    height: 40px;
    background: ${AquaBlue};
    border: 1px solid ${AquaBlue500};
    color: white;
    margin: 56px 0 0 auto;
    ${flexCenter()}
  }
${desktop(css`
  > .content {
    h4 {
      font-size: 18px;
      font-weight: 500;
      color: ${AquaBlue600};
      margin-top: 40px;
      margin-bottom: 16px;
    }
    dl {
      display: flex;
      border-bottom: 1px solid ${AquaBlue50};
    }
    dl:first-child {
      border-top: 1px solid ${AquaBlue300};
    }
    dl:last-child {
      border-bottom: 1px solid ${AquaBlue300};
    }
    dt {
      width: 200px;
      ${flexCenter()}
      font-size: 14px;
      font-weight: 500;
      color: ${AquaBlue600};
      background: ${AquaBlue50};
    }
    dd {
      display: block;
      flex: 1;
      font-size: 14px;
      color: ${Gray500};
      margin: 0;
      padding: 16px 10px;
      white-space: pre-wrap;
    }
    p {
      font-size: 14px;
      color: ${Gray500};
    }

  }
`)}

${mobile(css`
  margin-top: 8px;

  > .header {
    flex-direction: column;

    .thumbnail {
      width: 100%;
      height: 300px;
      /* background: no-repeat center / cover; */
      background-repeat: no-repeat, no-repeat;
      background-position: center, center;
      background-size: cover, contain;
      border: 1px solid ${Gray300};
      border-radius: 8px;
    }
    .content {
      h2 {
        font-size: 13px;
      }
      h1 {
        font-size: 20px;
      }
      .sub-header button {
        display: block;
        width: 40px;
        height: 40px;
        color: transparent;
        overflow: hidden;

        &:before {
          width: 100%;
          height: 100%;
          background-position: center;
        }
      }
      h4 {
        font-size: 14px;
      }
      .brief1 {
        font-size: 14px;
        flex-direction: column;
      }
      .c1 {
        margin-top: 24px;
        flex-direction: column;

        button {
          min-height: 40px;
        }
      }
    }
  }
  > .content {
    h4:first-child {
      font-size: 16px;
      font-weight: 500;
      color: ${AquaBlue};
    }
    dl {
      
    }
    dt, h4 {
      margin-top: 20px;
      font-weight: 500;
    }
    dd, p {
      margin-top: 8px;
      font-size: 14px;
      color: ${Gray500};
      margin: 0;
    }
    .articles {
      margin-top: 32px;

      li {
        display: list-item;
        padding-right: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
        margin: 8px 0;
      }
    }
    .goto-list  {
      margin-top: 32px;
    }
  }
`)}
`;

export const MaterialTag = styled.button`
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 13px;
  box-shadow: inset 0 0 0 1px ${Gray300};
  padding: 8px 10px;
  border-radius: 9999px;
`;

const DomesticContent: FC<{ className?: string }> = (props) => {
  return <Container {...props} />;
};

export default DomesticContent;
