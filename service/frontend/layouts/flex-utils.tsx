import { flex } from "@/styles/utils";
import styled, { css, IntrinsicElementsKeys, StyledComponent } from "styled-components";
import * as CSS from 'csstype';
import { kebabize } from "@/helper/utils";
import { ComponentType } from "react";

export const cssKeyToProperty = ({
  className,
  children,
  theme,
  ...props
}: CSS.Properties & any) => {
  let result = '';
  for (const key in props) {
    const property = kebabize(key);
    const value = (props as any)[key];
    result += property + ':' + value + ';\n';
  }
  return result;
};

const Flex = styled.div<{inline?: boolean;} & CSS.Properties>`
  display: ${({inline}) => inline ? 'inline-' : ''}flex;
  ${({inline, ...props}) => cssKeyToProperty(props)}
  /* ${({alignItems}) => alignItems ? css`align-items: ${alignItems};` : ''}
  ${({alignContent}) => alignContent ? css`align-content: ${alignContent};` : ''}
  ${({justifyItems}) => justifyItems ? css`justify-self: ${justifyItems};` : ''}
  ${({justifyContent}) => justifyContent ? css`justify-content: ${justifyContent};` : ''} */
`;

const ifIsNumberAddPx = (val: any) => typeof val === 'number' && !Number.isNaN(val) ? val + 'px' : val;

export const Column = styled(Flex)<{reverse?: boolean}>`
  flex-direction: ${({reverse}) => reverse ? 'reverse-' : ''}column;
`;
export const Row = styled(Flex)<{reverse?: boolean}>`
  flex-direction: ${({reverse}) => reverse ? 'reverse-' : ''}row;
`;
export const Item = styled.div<CSS.Properties & {
  flex?: number;
  width?: string|number
  height?: string|number
}>`
  ${({flex}) => flex ? css`flex: ${flex};` : ''}
  ${({width}) => width === undefined ? '' : css`width: ${ifIsNumberAddPx(width)};`}
  ${({height}) => height === undefined ? '' : css`height: ${ifIsNumberAddPx(height)};`}
  ${({flex, width, height, ...props}) => cssKeyToProperty(props)}
`;

export default Flex;