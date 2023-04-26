import { desktop, mobile } from "@/styles/utils";
import { FC } from "react";
import styled, { css } from "styled-components";

const Style = styled.section`
  position: relative;

${desktop(css`
  min-width: 1200px;
`)}

${mobile(css`
  width: 100%;
`)}
`;

const BackgroundSection: FC<{}> = ({ children, ...props }) => {
  return <Style {...props}>{children}</Style>;
};

export default BackgroundSection;