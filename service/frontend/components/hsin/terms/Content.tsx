import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  h1, h2 {
    margin-top: 32px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const Content: FC<{}> = props => {
  return <Container {...props} />;
};

export default Content;
