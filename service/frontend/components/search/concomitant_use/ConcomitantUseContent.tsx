import { AquaBlue } from "@/styles/variables";
import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  p {
    text-align: center;
    font-size: 18px;
    margin: 40px 0;
    
    b {
      font-weight: 500;
      color: ${AquaBlue};
    }
  }
`;

const ConcomitantUseContent: FC<{}> = (props) => {
  return <Container {...props} />;
};

export default ConcomitantUseContent;