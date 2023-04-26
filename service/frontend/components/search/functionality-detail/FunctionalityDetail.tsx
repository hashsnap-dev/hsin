import { alignItems, flexCenter, mobile } from "@/styles/utils";
import { AquaBlue, AquaBlue150, AquaBlue500, Gray300, Gray400, Gray500 } from "@/styles/variables";
import { FC } from "react";
import styled, { css } from "styled-components";

const FunctionalityDetailContent = styled.div`
  .header {
    text-align: center;
    width: 186px;
    
    .icon {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      background: no-repeat center;
    }

    h2 {
      margin-top: 32px;
      font-size: 18px;
      font-weight: 500;
      color: ${AquaBlue500};
    }
    h1 {
      font-size: 26px;
      font-weight: 500;
    }

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
    }
  }
  .content {
    flex: 1;

    h4 {
      margin-top: 40px;
      font-weight: 500;
      color: ${AquaBlue};
      padding: 7px;
      padding-left: 44px;
      border: 1px solid ${AquaBlue150};
      border-radius: 4px;
      background: url(/assets/icon_functionality_title.svg) no-repeat 15px center;
    }
    div:first-of-type h4 {
      margin-top: 0;
    }

    p {
      margin-top: 16px;
      color: ${Gray500};

    }

    .empty {
      width: 100%;
      height: 100%;
      filter: grayscale(100);
      background: url(/assets/image_search_blank.svg) no-repeat center;
      color: ${Gray400};
      ${flexCenter()}
      padding-top: 320px;
    }
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
    .empty {
      background-size: contain;
    }
  }
  .goto {
    margin-top: 32px;
    padding-top: 32px;

    button {
      width: 100%;
    }
    a {
      padding: 0 2px;
    }
    > div {
      width: ${100 / 3 * 2}%;

      a {
        width: 50%;
      }
    }
    > a {
      width: ${100 / 3}%;
    }
  }
`)}
`;

const FunctionalityDetail: FC<{}> = (props) => {
  return <FunctionalityDetailContent {...props} />
};

export default FunctionalityDetail;