import * as React from 'react';
import { Button, Box, Divider } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';

import { designWidth } from '../../../../styles/styles';
import { createInput, ExposedInputProps } from './input/input';
import { createPriceExplain } from './price/price';
import { createReasonSection } from './reason/reason';
import { nonEmpty, mustBeNumber } from './validator';

type FormProps = {
  onSubmit(): void;
  NameInput: React.ComponentType<ExposedInputProps>;
  CodeInput: React.ComponentType<ExposedInputProps>;
  PriceInput: React.ComponentType<ExposedInputProps>;
  MarketInput: React.ComponentType<ExposedInputProps>;
  PriceExplainComponent: React.ComponentType;
  Reason: React.ComponentType;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: designWidth[0],
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: designWidth[1],
    },
  },
}));

export const Form = React.memo(
  withTheme((props: FormProps & WithTheme) => {
    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit();
    };
    const styles = useStyles(props.theme);
    return (
      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Box padding={2} flex={1} className={styles.container}>
          <Box marginBottom={1}>
            <props.NameInput label="股票名" />
          </Box>
          <Box marginBottom={1}>
            <props.CodeInput label="代码" />
          </Box>
          <Box marginBottom={1}>
            <props.PriceInput label="价格" />
          </Box>
          <Box marginBottom={2}>
            <props.MarketInput label="市场" />
          </Box>
          <Divider />
          <Box mt={1}>
            <props.Reason />
          </Box>
          <Divider />
          <Box mt={1}>
            <props.PriceExplainComponent />
          </Box>
        </Box>
        <Button fullWidth variant="contained" color="primary" type="submit">
          买！买！买！
        </Button>
      </Box>
    );
  }),
);

export function createForm() {
  const [NameInput, nameInputStore] = createInput([nonEmpty]);
  const [CodeInput, codeInputStore] = createInput([nonEmpty]);
  const [PriceInput, priceInputStore] = createInput([nonEmpty, mustBeNumber]);
  const [MarketInput, marketInputStore] = createInput([nonEmpty]);
  const [PriceExplainComponent, priceExplainStore] = createPriceExplain();
  const [ReasonComponent, reasonStore] = createReasonSection();

  const onSubmit = () => {
    nameInputStore.startValidate();
    codeInputStore.startValidate();
    priceInputStore.startValidate();
    marketInputStore.startValidate();
    priceExplainStore.startValidate();
    reasonStore.startValidate();
  };
  return React.memo(() => (
    <Form
      onSubmit={onSubmit}
      NameInput={NameInput}
      CodeInput={CodeInput}
      PriceInput={PriceInput}
      MarketInput={MarketInput}
      PriceExplainComponent={PriceExplainComponent}
      Reason={ReasonComponent}
    />
  ));
}
