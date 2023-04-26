import Dropdown, { SelectContainer } from '@/components/Dropdown';
import { Spacer } from '@/components/Flex';
import Link from '@/components/Link';
import SectionTitle from '@/components/SectionTitle';
import { MaterialType } from '@/helper/enums';
import { omit } from '@/helper/utils';
import { flex, mobile } from '@/styles/utils';
import { Gray300, AquaBlue } from '@/styles/variables';
import { useRouter } from 'next/router';
import qs from 'qs';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  z-index: 1;

  .c {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* position: absolute; */
    width: 100%;
    /* transform: translateY(-100%); */
  }
  .total {
    font-size: 14px;
  }
  .options {
    display: flex;
  }

  ${SelectContainer} {
    font-size: 14px;
    width: 118px;
    /* height: 30px; */
    border-radius: 4px;
    box-shadow: 0 0 0 1px ${Gray300};

    .custom__control {
      background-image: url(/assets/icon_search_product_search_dropdown.svg);
      background-position: right 12px center !important;
      /* min-height: 30px; */
      /* align-items: center; */
    }
    .custom__value-container {
      padding-left: 20px !important;
    }
  }

  ul {
    position: relative;
    ${flex('center', 'start')}

    li {
      margin-right: 20px;
    }

    li.current {
      font-weight: 700;
      color: ${AquaBlue};
    }
  }
  ${mobile(css`
    .extra {
      padding-left: 106px;
    }
    ul {
      width: 100%;
      font-size: 14px;

      li {
        margin-right: 20px;
      }
    }
    .options {
      display: none;
    }
  `)}
`;

type BoardTitleProps<T, K> = {
  type?: string;
  orderOption?: T;
  orderOptions?: T[];
  onChangeOrder?: (p: T) => void;
  sizeOption?: K;
  sizeOptions?: K[];
  onChangeSize?: (p: K) => void;
};

const BoardTitle = <T extends any, K extends any>({
  type,
  orderOption,
  orderOptions,
  onChangeOrder,
  sizeOption,
  sizeOptions,
  onChangeSize,
}: BoardTitleProps<T, K>) => {
  const { query } = useRouter();

  return (
    <Container className="font-notosans">
      <div className="c">
        <ul>
          <Link href={`?${qs.stringify(omit({ ...query }, 'type'))}`}>
            <li className={!type ? 'current' : ''}>전체</li>
          </Link>
          <Link
            href={`?${qs.stringify({
              ...query,
              page: 1,
              type: 'exposed_case',
            })}`}
          >
            <li className={type === 'exposed_case' ? 'current' : ''}>
              적발사례
            </li>
          </Link>
          <Link
            href={`?${qs.stringify({ ...query, page: 1, type: 'report' })}`}
          >
            <li className={type === 'report' ? 'current' : ''}>
              식약처 보도자료
            </li>
          </Link>
        </ul>
        <div className="options">
          {orderOption && orderOptions && onChangeOrder && (
            <Dropdown
              value={orderOption}
              options={orderOptions}
              onChange={onChangeOrder}
            />
          )}
          <Spacer size={8} mobileSize={0} />
          {sizeOption && sizeOptions && onChangeSize && (
            <Dropdown
              className="desktop"
              value={sizeOption}
              options={sizeOptions}
              onChange={onChangeSize}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default BoardTitle;
