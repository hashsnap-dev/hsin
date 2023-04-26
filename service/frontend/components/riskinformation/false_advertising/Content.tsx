import { FlexGridContaier, FlexGridItem } from "@/components/FlexGrid";
import Link from "@/components/Link";
import { flex, flexCenter, mobile } from "@/styles/utils";
import { AquaBlue, AquaBlue600, Gray100, Gray200, Gray300, Gray400, Gray500, Gray600 } from "@/styles/variables";
import { FC } from "react";
import styled, { css } from "styled-components";
import { Item, Row } from "@/layouts/flex-utils";

const Container = styled.div`
  ${FlexGridContaier} {
    margin-top: 40px;
  }
  .title-wrapper {
    flex: 1;
    ${flex()}
  }
  .meta-wrapper {
    ${flex()}
    width: 220px;
  }
  .category {
    width: 175px;
  }
  .title {
    flex: 1;
  }
  .date {
    width: 120px;
    color: ${Gray400};
    font-size: 14px;
  }
  .view {
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
      height: 28px;

      ${Item} {
        ${flexCenter()}
      }

    }
  }
  .content {
    ${Item} {
      ${flexCenter()}
    }
    .row {
      padding: 5px 0;
      min-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid ${Gray300};
    }
    .title {
      justify-content: start;
    }
  }

${mobile(css`

  ${FlexGridItem} {
    width: 100%;
  }
  .header {
    display: none;
  }
  .content {
    margin-top: 24px;
    .row {
      padding: 18px;
      flex-direction: column;
      align-items: start;
    }
    .title-wrapper {
      align-items: center;
    }
    .meta-wrapper {
      margin-top: 18px;
      width: 100%;
      justify-content: space-between;
    }
    .mobile-block {
      /* display: block; */
    }
    a:nth-child(1) {
      border-top: 1px solid ${Gray600};
      /* display: block; */
    }
    .category {
      display: inline-block;
      width: unset;
      font-size: 10px;
      border: 1px solid ${Gray600};
      padding: 0 4px;
      border-radius: 2px;
      ${flexCenter()}
    }
    .title {
      padding-left: 10px;
    }
    .date {
      /* display: none; */
      font-size: 12px;
      width: initial;
    }
    .date:before {
      content: '등록일';
      margin-right: 10px;
    }
    .view {
      color: ${Gray400};
      font-size: 12px;
      width: initial;
    }
    .view:before {
      content: '조회수';
      margin-right: 0.5em;
    }
  }
`)}
`;


const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;