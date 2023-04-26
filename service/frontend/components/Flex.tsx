import { desktop, mobile } from '@/styles/utils';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const SpacerContainer = styled.div<{size: number; mobileSize: number}>`
  display: 'inline-block';

${desktop(css`
  width: ${({size}: any) => size}px;
  height: ${({size}: any) => size}px;
`)}
${mobile(css`
  width: ${({size, mobileSize}: any) => mobileSize === undefined ? size : mobileSize}px;
  height: ${({size, mobileSize}: any) => mobileSize === undefined ? size : mobileSize}px;
`)}
`;
export const Spacer: FC<{ id?: string; size: number; className?: string; mobileSize?: number;}> = ({ id, size, className = '', mobileSize = size, ...props}) => {
  return (
    <SpacerContainer
      id={id}
      className={className}
      size={size}
      mobileSize={mobileSize === undefined ? size : mobileSize}
    />
  );
};

const Flex: FC<{
  className?: string;
  direction?: 'column' | 'row';
  spacing?: number;
}> = ({ className, direction = 'row', spacing = 0, children }) => {
  return (
    <Container
      className={`${Container} ${className ?? ''}`}
      style={{
        flexDirection: direction,
      }}
    >
      {(children as any[])?.reduce?.((acc, Item, i, { length }) => {
        acc.push(Item);
        if (i !== length - 1 && spacing) acc.push(<Spacer size={spacing} key={`flex-spacer-${i}`}/>);
        return acc;
      }, []) ?? children}
    </Container>
  );
};

export default Flex;
