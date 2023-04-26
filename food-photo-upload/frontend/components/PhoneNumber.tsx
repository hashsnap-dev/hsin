import React from 'react';

interface PhoneNumberProps {
  value?: string;
}

export default function PhoneNumber({ value = '' }: PhoneNumberProps) {
  let formattedNumber = value;

  if (value.length === 11) {
    formattedNumber =
      value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
  } else if (value.length === 10) {
    if (value.startsWith('01')) {
      formattedNumber =
        value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
    } else if (value.startsWith('02')) {
      formattedNumber =
        value.slice(0, 2) + '-' + value.slice(2, 6) + '-' + value.slice(6);
    } else {
      formattedNumber =
        value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
    }
  } else if (value.length === 9) {
    formattedNumber =
      value.slice(0, 2) + '-' + value.slice(2, 5) + '-' + value.slice(5);
  }

  return <>{formattedNumber}</>;
}
