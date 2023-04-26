import Dropdown, { SelectContainer } from '@/components/Dropdown';
import { Spacer } from '@/components/Flex';
import { mobile } from '@/styles/utils';
import {
  AquaBlue100,
  AquaBlue50,
  AquaBlue600,
  Gray300,
} from '@/styles/variables';
import { FC, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export const SearchbarContainer = styled.div`
  width: 720px;
  height: 30px;
  box-shadow: inset 0 0 0 1px ${Gray300};
  background: white;
  position: relative;
  /* border-radius: 4px; */

  display: flex;
  align-items: center;

  select {
    width: 120px;
    border: 0;
    outline: none;
    font-size: 14px;
  }
  .VHr {
    height: 15px;
    border-left: 1px solid ${Gray300};
  }
  input {
    flex: 1;
    border: 0;
    outline: none;
    padding: 0 10px;
    font-size: 14px;
    background: transparent;
    height: 100%;
  }
  .clear {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(/assets/icon_search_detail_clear.svg) no-repeat center;
  }

  ${SelectContainer} {
    font-size: 14px;
    width: 120px;
    .custom__control {
      background-image: url(/assets/icon_search_product_search_dropdown.svg);
      background-position: right 12px center;
    }
    .custom__value-container {
      padding-left: 20px;
    }
  }
  ${mobile(css`
    width: 100%;
    height: 40px;
    ${SelectContainer} {
      width: 90px;
      min-width: 90px;

      .custom__control {
        background-position: right 8px center;
      }

      .custom__value-container {
        padding-left: 10px;
      }
    }
    .clear {
      position: absolute;
      right: 0;
    }
  `)}
`;

const Searchbar: FC<{
  onChange: (ev: any) => void;
  type: any;
  options: any;
  onTypeChange: (val: any) => void;
  value: string;
  onEnter: () => void;
}> = ({ onChange, type, options, onTypeChange, value, onEnter }) => {
  const input = useRef<HTMLInputElement>(null);

  const clearHandler = () => {
    if (input.current?.value) onChange((input.current.value = ''));
    input.current?.focus();
  };

  return (
    <SearchbarContainer>
      <Dropdown value={type} onChange={onTypeChange} options={options} />
      <div className="VHr" />
      <input
        ref={input}
        placeholder="검색어를 입력하세요."
        onChange={(ev) => onChange(ev.target.value)}
        onKeyDown={({ key }) => key === 'Enter' && onEnter()}
        defaultValue={value}
      />
      <button className="clear mobile" onClick={clearHandler} />
    </SearchbarContainer>
  );
};

export default Searchbar;
