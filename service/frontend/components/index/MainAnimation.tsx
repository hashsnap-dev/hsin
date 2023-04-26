import { mobile } from "@/styles/utils";
import { useEffect } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 800px;
  height: 460px;
  overflow: hidden;

${mobile(css`
  width: 100%;
  bottom: 0;
`)}
`;

const Iframe = styled.iframe`
  border: 0;
  width: 967px;
  height: 675px;

  position: absolute;
  top: -140px;
  left: -36px;

${mobile(css`
  left: 50%;
  transform: translateX(-50%) scale(0.75);
  transform-origin: 50% 100%;
  margin-left: 40px;
`)}
`;

const MainAnimation = () => {
  return <Container>
    <Iframe src="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/assets/main-animation/index.html" />
  </Container>
};

export default MainAnimation;