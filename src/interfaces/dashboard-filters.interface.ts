import React from 'react';

export interface Props {
  handleFromDate: (date: string) => void;
  handleToDate: (date: string) => void;
  handleLastFromDate: (date: string) => void;
  handleLastToDate: (date: string) => void;
}

export interface ICheckBoxInput {
  label: string;
  callback: (doc: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
