import { Gray100, Gray200, Gray300, Gray600 } from '@/styles/variables';
import { FC } from 'react';
import styled from 'styled-components';

export const RadioBox = styled.label`
  display: inline-flex;
  align-items: center;

  input {
    position: absolute;
    visibility: hidden;
  }
  .checkbox {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid ${Gray600};
    margin-right: 6px;
    background: white;

    &:before {
      content: '';
      position: absolute;
      display: inline-block;
      left: 50%;
      top: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.25s;
    }
  }
  &:hover .checkbox {
    background: ${Gray100};
  }
  &:active .checkbox {
    background: ${Gray200};
  }

  &:active .checkbox:before {
    width: 7px;
    height: 7px;
    background: ${Gray300};
  }

  input:checked ~ .checkbox:before {
    background: ${Gray600};
  }
`;

const Radio: FC<{ 
  label: string;
  onClick: (val: string) => void;
} & { [K in keyof HTMLInputElement]?: any }> =
  ({ label, onClick, ...props }) => {
    return (
      <RadioBox>
        <input type="radio" 
          onClick={ev => onClick((ev.target as any).value)}
          {...props} />
        <div className="checkbox" />
        {label}
      </RadioBox>
    );
  };

export default Radio;
