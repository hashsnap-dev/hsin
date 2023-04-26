import { alignItems, desktop, flexCenter, mobile } from "@/styles/utils";
import { AquaBlue, AquaBlue100, AquaBlue150, AquaBlue200, AquaBlue500, Gray100, Gray300, Gray500 } from "@/styles/variables";
import { FC } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  .header {
    text-align: center;
    width: 186px;
    
    .icon {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      background: no-repeat center / 120%;
    }

    h1 {
      margin-top: 16px;
      font-size: 26px;
      font-weight: 500;
    }
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: ${Gray500};
    }
/* 
    a {
      margin-top: 8px;
      font-weight: 500;
      height: 48px;
      border: 1px solid ${Gray300};
      border-radius: 4px;
      ${flexCenter()}
    }
    a:first-of-type {
      margin-top: 60px;
    } */
  }
  .content .description {
    border: 1px solid ${Gray300};
    border-radius: 4px;
    padding: 16px 24px;
    margin-bottom: 10px;

    .title .no {
      font-size: 20px;
      font-weight: 700;
      color: ${AquaBlue};
    }
    .title .hr {
      margin: 0;
      border: 0;
      border-left: 1px solid ${Gray300};
      margin: 0 18px;
      height: 23px;
    }
    .title h4 {
      font-size: 18px;
      font-weight: 700;
    }

  }
${desktop(css`
  .content {
    flex: 1;

    .description {
      .medicines {
        margin-top: 16px;
        padding-top: 20px;
        border-top: 1px solid ${Gray300};
      }
      .medicines table {
        width: 100%;
        border-collapse: collapse;

        caption {
          width: 100%;
          height: 48px;
          line-height: 48px;
          background: ${AquaBlue};
          color: white;
          font-weight: 500;
          
        }

        thead th {
          height: 38px;
          color: ${AquaBlue};
          font-size: 14px;
          font-weight: 500;
          background: ${AquaBlue100};
          border-top: 1px solid ${AquaBlue200};
          border-left: 1px solid ${AquaBlue200};
          border-right: 1px solid ${AquaBlue200};
        }
        tbody tr {
          height: 58px;
        }
        tbody td {
          font-size: 14px;
          text-align: center;
          border: 1px solid ${Gray300};
        }
        tbody tr:nth-child(2n) {
          background: ${Gray100};
        }
      }
    }
  }
`)}

  .bottom-image {
    width: 100%;  
  }

  .goto {
    margin-top: 64px;
    width: 100%;
    padding-top: 56px;
    border-top: 1px solid ${Gray300};
  }

${mobile(css`
  .layout {
    flex-direction: column;

  }
  .header {
    width: 100%;

    a:first-of-type {
      margin-top: 40px;
    }
  }

  .content {
    .description {
      padding: 8px;
      .title {
        align-items: stretch;
      }
      .title .no {
        font-size: 16px;
        ${alignItems('center')}
      }
      .title .hr {
        height: initial;
        margin: 0 8px;
      }
      .title h4 {
        font-size: 14px;
      }
    }
    .medicines:before {
      margin-top: 8px;
      content: '';
      display: block;
      border-top: 1px solid ${Gray300};
    }
    .medicines table {
      margin-top: 8px;
      width: 100%;
      border-collapse: collapse;

      caption {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 500;
        color: white;
        background: ${AquaBlue};
      }
      thead {
        display: none;
      }
      td {
        display: block;
        font-size: 12px !important;
        border: 0;
        border-bottom: 1px solid ${Gray300};
        padding: 0;
        height: 30px;
      }
      td:before {
        /* display: inline-block; */
        width: 90px;
        height: 100%;
        color: ${AquaBlue};
        background: ${AquaBlue100};
        font-weight: 500;
        ${flexCenter({inline: true})}
        margin-right: 8px;
      }
      td:nth-child(1):before {
        content: '의약품 성분';
      }
      td:nth-child(2):before {
        content: '제품명';
      }
      td:nth-child(3):before {
        content: '분 류';
      }
      td:nth-child(4):before {
        content: '전문/일반의약품';
      }
      td:nth-child(1) {
        border-top: 1px solid ${AquaBlue};
      }
      td:nth-child(2n) {
        background: ${Gray100};
      }
      tr:first-child td:nth-child(1) {
        border-top: 1px solid ${Gray300};
      }
      tr td:nth-child(4) {
        border-bottom: 0;
      }
      tr:last-child td:nth-child(4) {
        border-bottom: 1px solid ${Gray300};
      }
    }
  }
  .goto {
    margin-top: 16px;
    padding-top: 32px;
  }
`)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />
};

export default Content;