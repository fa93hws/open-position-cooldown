import * as React from 'react';
import { Button, Box } from '@material-ui/core';

import { createInput, ExposedInputProps } from './input/input';
import { nonEmpty, mustBeNumber } from './validator';

type FormProps = {
  onSubmit(): void;
  NameInput: React.ComponentType<ExposedInputProps>;
  CodeInput: React.ComponentType<ExposedInputProps>;
  PriceInput: React.ComponentType<ExposedInputProps>;
  MarketInput: React.ComponentType<ExposedInputProps>;
};

export const Form = React.memo((props: FormProps) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit();
  };
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Box padding={3} flex={1}>
        <Box marginBottom={2}>
          <props.NameInput label="股票名" />
        </Box>
        <Box marginBottom={2}>
          <props.CodeInput label="代码" />
        </Box>
        <Box marginBottom={2}>
          <props.PriceInput label="价格" />
        </Box>
        <Box marginBottom={2}>
          <props.MarketInput label="市场" />
        </Box>
      </Box>
      <Button fullWidth variant="contained" color="primary" type="submit">
        买！买！买！
      </Button>
    </Box>
  );
});

export function createForm() {
  const [NameInput, nameInputStore] = createInput([nonEmpty]);
  const [CodeInput, codeInputStore] = createInput([nonEmpty]);
  const [PriceInput, priceInputStore] = createInput([nonEmpty, mustBeNumber]);
  const [MarketInput, marketInputStore] = createInput([nonEmpty]);
  const onSubmit = () => {
    nameInputStore.startValidate();
    codeInputStore.startValidate();
    priceInputStore.startValidate();
    marketInputStore.startValidate();
  };
  return React.memo(() => (
    <Form
      onSubmit={onSubmit}
      NameInput={NameInput}
      CodeInput={CodeInput}
      PriceInput={PriceInput}
      MarketInput={MarketInput}
    />
  ));
}
