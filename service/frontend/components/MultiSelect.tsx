import styled from 'styled-components';
import Select, { MultiValue, StylesConfig } from 'react-select';
// import AsyncSelect from 'react-select/async';
import { useEffect } from 'react';

export const MultiSelectContainer = styled.div`
  /* .custom__control {
    border: 0;
    box-shadow: none;
    background: url(/assets/icon_index_dropdown.svg) no-repeat right center;
    font-weight: 500;

    .custom__indicator-separator {
      display: none;
    }
    .custom__indicator {
      display: none;
    }
    .custom__value-container {
      padding: 0;
    }
    .custom__single-value {
      margin: 0;
    }
  } */
`;
const MultiSelect = <T extends any>({
  value,
  placeholder,
  options,
  styles = {},
  onChange,
  onInputChange = () => {},
}: {
  value: T[];
  placeholder: string;
  options: T[];
  onInputChange?: (str: string) => void;
  onChange: (p: MultiValue<T>) => void;
  styles?: StylesConfig<T, true>;
}) => {
  return (
    <MultiSelectContainer>
      <Select
        className="font-notosans"
        classNamePrefix="custom"
        placeholder={placeholder}
        isMulti
        styles={styles}
        value={value}
        onInputChange={onInputChange}
        onChange={(val) => onChange(val)}
        options={options}
        noOptionsMessage={() => <>원료 이름을 입력해주세요.</>}
        // https://github.com/JedWatson/react-select/issues/761#issuecomment-291068950
        filterOption={() => true}
      />
    </MultiSelectContainer>
  );
};

export default MultiSelect;
