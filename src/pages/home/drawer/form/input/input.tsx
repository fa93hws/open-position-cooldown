import * as React from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';

import { InputStore } from './input-store';

export type ExposedInputProps = {
  label: string;
};

type InputProps = ExposedInputProps & {
  value: string;
  error: boolean;
  onChange(val: string): void;
  onBlur(): void;
};

export const Input = React.memo((props: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };
  return (
    <TextField
      label={props.label}
      onChange={handleChange}
      onBlur={props.onBlur}
      value={props.value}
      error={props.error}
      fullWidth
      color="primary"
      type="text"
      variant="outlined"
      size="small"
    />
  );
});

export function createInput(validators: readonly ((val: string) => boolean)[]) {
  const store = new InputStore(validators);
  const onChange = (val: string) => store.setValue(val);
  const onBlur = () => store.startValidate();

  const Component = observer((props: ExposedInputProps) => (
    <Input
      value={store.value}
      error={store.hasError}
      onChange={onChange}
      onBlur={onBlur}
      label={props.label}
    />
  ));
  return [Component, store] as const;
}
