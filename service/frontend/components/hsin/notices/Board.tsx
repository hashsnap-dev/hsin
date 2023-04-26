import { Row } from "@/layouts/flex-utils";
import { FC } from "react";
import styled, { css } from "styled-components";

export type BoardHeadCell = {
  label: string; 
  width?: number;
  flex?: number;
  align?: 'left'|'center'|'right';
};
export type BoardHead = BoardHeadCell[];

const BoardContainer = styled.div`

`;

const H = styled.div``;

const Cell = styled.div<{
  width?: number;
  flex?: number;
  align?: BoardHeadCell['align'];
}>`
  ${({width}) => width ? css`width: ${width}px;`: ''}
  ${({flex}) => flex ? css`flex: ${flex};`: ''}
  ${({align}) => align ? css`text-align: ${align};`: ''}
`;

const Board: FC<{
  head: BoardHead;
}> = ({head}) => {
  return <BoardContainer>
    <Row>{head.map(({label, width, flex}, i) => <Cell width={width} flex={flex} key={`board-${i}`}>{label}</Cell>)}</Row>
  </BoardContainer>
};

export default Board;