import { FC } from "react";
import styled from "styled-components";

export const CheckboxContainer = styled.label`

`;

const handler = (f: (val: boolean, ev: any) => void, ev: any) => {
  const value = ev.target.checked as boolean;
  f(value, ev);
};

const Checkbox: FC<{
  label: string;
  value: boolean;
  onChange: (val: boolean, ev: any) => void;
}> = ({label, value, onChange}) => {
  return <CheckboxContainer>
    <input type="checkbox" checked={value} onChange={(ev) => handler(onChange, ev)} />
    {label}
  </CheckboxContainer>;
};
export default Checkbox;