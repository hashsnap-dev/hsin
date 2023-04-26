import Dropdown, { SelectContainer } from '@/components/Dropdown';
import { Spacer } from '@/components/Flex';
import SectionTitle from '@/components/SectionTitle';
import { mobile } from '@/styles/utils';
import { Gray300 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  z-index: 1;
  
  .extra {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 123px;
    position: absolute;
    width: 100%;
    transform: translateY(-100%);
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
      height: 30px;
      /* align-items: center; */
    }
    .custom__value-container {
      padding-left: 10px !important;
    }
  }

${mobile(css`
  .extra {
    padding-left: 106px;
  }
`)}
`;

type BoardTitleProps<T, K> = {
  label: string;
  total: number;
  orderOption: T;
  orderOptions: T[];
  onChangeOrder: (p: T) => void;
  sizeOption: K;
  sizeOptions: K[];
  onChangeSize: (p: K) => void;
};

const BoardTitle = <T extends any, K extends any>({
  label,
  total,
  orderOption,
  orderOptions,
  onChangeOrder,
  sizeOption,
  sizeOptions,
  onChangeSize,
}: BoardTitleProps<T, K>) => {
  return (
    <Container className="font-notosans">
      <SectionTitle label={label} />
      <div className="extra">
        <div className="total">Total: {total}</div>
        <div className="options">
          <Dropdown
            value={orderOption}
            options={orderOptions}
            onChange={onChangeOrder}
          />
          <Spacer size={8} mobileSize={0} />
          <Dropdown
            className="desktop"
            value={sizeOption}
            options={sizeOptions}
            onChange={onChangeSize}
          />
        </div>
      </div>
    </Container>
  );
};

export default BoardTitle;
