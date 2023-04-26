import { Input } from 'antd';
import React, { useState } from 'react';

interface NumberInputProps {
  [key: string]: any;
  value?: string;
  onChange?: (value: string) => void;
}

export default function NumberInput({
  value,
  onChange,
  ...restProps
}: NumberInputProps) {
  const [number, setNumber] = useState('');

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue);
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;

    if (!/^[0-9]*$/.test(newNumber)) {
      return;
    }

    setNumber(newNumber);

    triggerChange(newNumber);
  };

  return <Input value={value} onChange={onNumberChange} {...restProps} />;
}
