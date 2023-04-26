import { ComponentProps, FC, useState } from 'react';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import { mobile } from '@/styles/utils';

export const SelectContainer = styled.div`
  .custom__control {
    border: 0;
    box-shadow: none;
    background: url(/assets/icon_index_dropdown.svg) no-repeat right center;
    font-weight: 500;
    min-height: auto !important;
    
    .custom__indicators {
      display: none;
    }
    .custom__indicator-separator {
      opacity: 0;
    }
    .custom__indicator {
      opacity: 0;
      /* position: absolute; */
    }
    /* .custom__value-container {
      padding: 0;
    } */
    /* .custom__single-value {
      margin: 0;
    } */
  }
${mobile(css`
  .custom__indicators {
    position: absolute;
  }
`)}
`;
const Dropdown = <T extends any>({
  value,
  className,
  onChange,
  options,
  isSearchable = false,
  placeholder,
}: {
  value: T;
  className?: string;
  options: T[];
  onChange: (p: T) => void;
  placeholder?: string;
  isSearchable?: boolean;
}) => {
  return (
    <SelectContainer className={className}>
      <Select
        className="font-notosans"
        classNamePrefix="custom"
        placeholder={placeholder}
        isSearchable={isSearchable}
        value={value}
        onChange={(val) => onChange(val as NonNullable<typeof val>)}
        options={options}
      />
    </SelectContainer>
  );
};

export default Dropdown;
