import Dropdown, { SelectContainer } from '@/components/Dropdown';
import { mobile } from '@/styles/utils';
import {
  AquaBlue100,
  AquaBlue50,
  AquaBlue600,
  ContentWidth,
  Gray300,
} from '@/styles/variables';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from './Flex';
import Link from './Link';

const Container = styled.div`
  width: ${ContentWidth};
  margin: 0 auto;
  margin-top: 16px;
  background: ${AquaBlue50};
  border: 1px solid ${AquaBlue100};
  padding: 30px 250px;

  .c1 {
    height: 48px;
    box-shadow: 0 0 0 1px ${AquaBlue600};
    border-radius: 4px;

    display: flex;
    align-items: center;
    background: white;
  }

  .VHr {
    height: 32px;
    border-left: 1px solid ${Gray300};
  }
  input {
    flex: 1;
    border: 0;
    outline: none;
    padding: 0 10px;
    font-size: 15px;
  }
  button {
    width: 130px;
    height: 100%;
    background: ${AquaBlue600};
    color: white;
  }

  ${SelectContainer} {
    width: 120px;
    .custom__control {
      background-position: right 12px center !important;
    }
    .custom__value-container {
      padding-left: 20px;
    }
  }

${mobile(css`
  width: 100%;
  margin-top: 0;
  padding: 16px;

  ${SelectContainer} {
    width: 76px;

    .custom__control {
      background-position: right 5px center !important;
    }

    .custom__single-value {
      font-size: 14px;
    }

    .custom__value-container {
      padding-left: 10px;
    }
  }

  input {
    width: 100%;
    font-size: 14px;
  }

  a {
    width: 40px;
    color: transparent;
    background-image: url(/assets/icon_search_white.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
  button {
    width: 40px;
    color: transparent;
    background: url(/assets/icon_search_white.svg) ${AquaBlue600} no-repeat center;
  }
`)}
`;

const SearchPanel: FC<{
  option?: any;
  options?: any;
  onOptionChange?: (val: any) => void;
  value: string;
  onChange: (str: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}> = ({option, options, onOptionChange, value, onChange, onSubmit, placeholder}) => {

  return (
    <Container className="font-notosans">
      <div className="c1">
        {options && <Dropdown
          value={option}
          onChange={(val: any) => onOptionChange?.(val)}
          options={options}
        />}
        {/* <select defaultValue="통합">
          <option value="통합">통합</option>
          <option value="제목">제목</option>
          <option value="내용">내용</option>
        </select> */}
        <div className="VHr" />
        <input placeholder={placeholder ?? '검색어를 입력하세요.'}
          defaultValue={value} onChange={ev => onChange(ev.target.value)} onKeyDown={ev => ev.key === 'Enter' && onSubmit()} />
        <button className="flex-center" onClick={onSubmit}>
          검 색
        </button>
      </div>
    </Container>
  );
};

export default SearchPanel;
