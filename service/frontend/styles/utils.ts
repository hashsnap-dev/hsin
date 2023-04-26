
import { css, FlattenInterpolation, FlattenSimpleInterpolation, ThemeProps } from "styled-components"

export const mobile = (style: FlattenSimpleInterpolation|FlattenInterpolation<ThemeProps<any>>) => css`
  @media screen and (max-width: 500px) {
    ${style}
    /* .desktop {
      display: none;
    } */
  }
`;
export const desktop = (style: FlattenSimpleInterpolation|FlattenInterpolation<ThemeProps<any>>) => css`
  @media screen and (min-width: 500px) {
    ${style}
    /* .mobile {
      display: none;
    } */
  }
`; 
type AlignItems = 'normal'|'stretch'|'center'|'start'|'end'|'flex-start'|'flex-end'|'baseline'|'first baseline'|'last baseline'|'safe center'|'unsafe center'|'inherit'|'initial'|'revert'|'unset';
type JustifyContent = 'center'|'start'|'end'|'flex-start'|'flex-end'|'left'|'right'|'normal'|'space-between'|'space-around'|'space-evenly'|'stretch'|'safe center'|'unsafe center'|'inherit'|'initial'|'revert'|'unset';
type FlexDirection = 'row'|'row-reverse'|'column'|'column-reverse'|'inherit'|'initial'|'revert'|'unset';
type FlexWrap = 'nowrap'|'wrap'|'wrap-reverse'|'inherit'|'initial'|'revert'|'unset';

export const flex = (alignItems?: AlignItems, justifyContent?: JustifyContent, {
  inline,
  direction,
  wrap,
}: {
  inline?: boolean;
  direction?: FlexDirection;
  wrap?: FlexWrap;
} = {}) => {
  return css`
    display: ${inline ? 'inline-' : ''}flex;
    ${alignItems ? `align-items: ${alignItems};`: ''}
    ${justifyContent ? `justify-content: ${justifyContent};`: ''}
    ${direction ? `flex-direction: ${direction};`: ''}
    ${wrap ? `flex-wrap: ${wrap};`: ''}
  `;
};

export const alignItems = (alignItems?: AlignItems, options: {
  inline?: boolean;
  direction?: FlexDirection;
  wrap?: FlexWrap;
} = {}) => flex(alignItems, 'normal', options);

export const justifyContent = (justifyContent?: JustifyContent, options: {
  inline?: boolean;
  direction?: FlexDirection;
  wrap?: FlexWrap;
} = {}) => flex('normal', justifyContent, options);

export const flexCenter = (options: {
  inline?: boolean;
  direction?: FlexDirection;
  wrap?: FlexWrap;
} = {}) => {
  return flex('center', 'center', options);
};

export const fill = css`
  width: 100%; 
  height: 100%;
`;

