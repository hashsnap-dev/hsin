import { fillEmpty } from '@/helper/utils';
import { Item, Row } from '@/layouts/flex-utils';
import { mobile } from '@/styles/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import EmptyResult from './EmptyResult';

export const FlexGridItem = styled(Item)``;
export const FlexGridContaier = styled(Row)<{
  columns: number;
  spacing: number;
  mobileSpacing: number;
}>`
  ${FlexGridItem} {
    width: ${({ columns }) => 100 / columns}%;
    padding: ${({ spacing }) => spacing / 2}px;
  }

  ${mobile(css`
    ${FlexGridItem} {
      width: ${100 / 2}%;
      padding: ${({ spacing, mobileSpacing }: any) =>
        (mobileSpacing ?? spacing) / 2}px;
    }
  `)}
`;
interface FlexGridProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: number;
  spacing?: number;
  mobileSpacing?: number;
  data: T[];
  render: (props: T) => ReactNode;
  search: string;
}

// row direction
const FlexGrid = <T extends any>({
  columns,
  spacing = 0,
  mobileSpacing,
  data,
  render,
  search,
  ...props
}: FlexGridProps<T>) => {
  const filledData = data ? fillEmpty(data, columns, null) : [];

  return (
    <FlexGridContaier
      columns={columns}
      spacing={spacing}
      mobileSpacing={mobileSpacing ?? spacing}
      flexWrap="wrap"
      {...props}
    >
      {filledData.length ? (
        filledData.map((item, i) => {
          if (item) {
            return (
              <FlexGridItem key={`flex-grid-item-${i}`}>
                {render(item)}
              </FlexGridItem>
            );
          } else {
            return (
              <FlexGridItem className="empty" key={`flex-grid-item-${i}`} />
            );
          }
        })
      ) : (
        <EmptyResult search={search} />
      )}
    </FlexGridContaier>
  );
};

export default FlexGrid;
