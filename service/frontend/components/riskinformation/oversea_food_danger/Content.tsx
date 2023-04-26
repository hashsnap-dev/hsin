import { FlexGridContaier, FlexGridItem } from "@/components/FlexGrid";
import Link from "@/components/Link";
import { mobile } from "@/styles/utils";
import { AquaBlue, AquaBlue600, Gray100, Gray200, Gray300, Gray400, Gray500 } from "@/styles/variables";
import { FC } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  ${FlexGridContaier} {
    margin-top: 40px;
  }

${mobile(css`
  ${FlexGridItem} {
    width: 100%;
  }
`)}
`;

export const Card = styled.div`
  border: 1px solid ${Gray300};
  border-radius: 4px;
  text-align: left;
  height: 100%;

  .thumbnail-wrapper {
    position: relative;
    width: 216px;
    padding-bottom: 216px;
    padding: 30px;
  }
  .thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    background: no-repeat center / contain;
  }
  .content {
    flex: 1;
    padding: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: 500;
    color: ${AquaBlue600};
  }
  time {
    font-size: 14px;
    color: ${Gray400};
  }
  h1 {
    margin-top: 29px;
    /* height: 68px; */
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 14px;
    border-bottom: 1px solid ${Gray200};
  }
  h3 {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
  }
  p {
    font-size: 13px;
    color: ${Gray500};
  }


${mobile(css`
  .thumbnail-wrapper {
    position: relative;
    width: 100px;
    padding: 10px;
  }
  h2 {
    font-size: 12px;
  }
  h1 {
    margin-top: 13px;
    font-size: 15px;
    height: initial;
    padding-bottom: 8px;
  }
  h3, p {
    font-size: 12px;
  }
  h3 {
    margin-top: 10px;
  }

`)}
`;

const Content: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default Content;