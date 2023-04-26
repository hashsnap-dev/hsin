import { mobile } from '@/styles/utils';
import styled, { css } from 'styled-components';

const ColorBackground = styled.div<{
  color: string;
  height: number;
  bottom?: number;
  pattern?: boolean;
  mobileHeight?: number;
  mobileBottom?: number;
}>`
  position: absolute;
  bottom: 0;
  background: ${({ color }) => color} no-repeat;
  ${({ pattern }) =>
    pattern
      ? css`
          background-image: url(/assets/pattern_information.png);
        `
      : ''}
  width: 100%;
  height: ${({ height }) => height}px;
  bottom: ${({ bottom }) => bottom ?? 0}px;
  z-index: -1;

  ${mobile(css`
    height: ${({ height, mobileHeight }: any) => mobileHeight ?? height}px;
    bottom: ${({ bottom, mobileBottom }: any) => mobileBottom ?? bottom ?? 0}px;
  `)}
`;

export default ColorBackground;
