import Link from "@/components/Link";
import styled from "styled-components";

const ShortcutButton = styled(Link)<{ color?: string; bgColor?: string; borderColor?: string }>`
  font-family: 'Noto Sans KR';
  font-weight: 500;
  color: ${({ color }) => color ?? 'white'};;
  background: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  width: 300px;
  height: 48px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ShortcutButton;