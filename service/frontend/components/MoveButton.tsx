import { AquaBlue500, AquaBlue600, Gray300, Gray400 } from "@/styles/variables";
import { FC } from "react";
import styled, { css } from "styled-components";
import Link from "./Link";

export const MoveButtonContainer = styled.button<{ primary: boolean }>`
  cursor: pointer;
  width: 120px;
  height: 40px;
  font-weight: 500;
  ${({ primary }) =>
    primary
      ? css`
          background: ${AquaBlue600};
          color: white;
          border: 0;
        `
      : css`
          background: white;
          color: ${AquaBlue600};
          border: 1px solid ${AquaBlue500};
        `}

  &:disabled {
    color: ${Gray400};
    border: 1px solid ${Gray300};
  }
`;

const MoveButton: FC<{
  href: string;
  primary?: boolean;
  disabled?: boolean;
}> = ({ href, primary = false, disabled, ...props }) => {
  return (
    <Link href={href}>
      <MoveButtonContainer
        {...props}
        primary={primary}
        disabled={disabled}
        title={disabled ? '더이상 포스트가 없습니다.' : ''}
      />
    </Link>
  );
};

export default MoveButton;