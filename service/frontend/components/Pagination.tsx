import { createPaginationIndex, obj2params } from '@/helper/utils';
import { mobile } from '@/styles/utils';
import { Gray100, Gray200, Gray300, Gray400 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from './Link';

const Container = styled.div`
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    border: 1px solid ${Gray200};
    border-right: 0;
    background: white;
    padding: 0;
  }
  a button:disabled {
    opacity: 0.5;
  }
  a {
    display: block;
  }
  a:first-child button {
    background-image: url(/assets/icon_pagination_left.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
  a:last-child button {
    background-image: url(/assets/icon_pagination_right.svg);
    background-repeat: no-repeat;
    background-position: center;
    border-right: 1px solid ${Gray200};
  }
  .current button {
    background: ${Gray200};
  }

  ${mobile(css`
    button {
      font-size: 14px;
      min-width: 25px;
      height: 25px;
    }
  `)}
`;

const PaginationButton: FC<{
  className?: string;
  page: number;
  params: any;
  disabled?: boolean;
}> = ({ className = '', page, params, disabled = false, children }) => {
  return (
    <Link
      className={className}
      href={`?${obj2params({
        ...params,
        page,
      })}`}
      scroll={false}
    >
      <button disabled={disabled}>{children}</button>
    </Link>
  );
};

const Pagination: FC<{
  total: number;
  page: number;
  limit: number;
  params: any;
}> = ({ total, page, limit, params }) => {
  const {
    isFirst,
    isLast,
    items: pagination,
    prevFirst,
    nextFirst,
    first,
    last,
  } = createPaginationIndex(page, total, limit);

  return (
    <Container className="flex-center">
      <PaginationButton page={prevFirst} params={params} disabled={isFirst} />
      {pagination.map((n) => (
        <PaginationButton
          page={n}
          params={params}
          className={page === n ? 'current' : ''}
          key={`pagination-item-${n}`}
        >
          {n}
        </PaginationButton>
      ))}
      <PaginationButton page={nextFirst} params={params} disabled={isLast} />
    </Container>
  );
};
export default Pagination;
