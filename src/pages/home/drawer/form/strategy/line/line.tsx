import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

import { createInput, ExposedInputProps } from '@ui/text-input/input';
import { nonEmpty, mustBeNumber } from '@ui/text-input/validator';
import { LineStore } from './line-store';

type LineProps = WithTheme & {
  PriceInput: React.ComponentType<ExposedInputProps>;
  QuantityInput: React.ComponentType<ExposedInputProps>;
};

export const useInputStyles = makeStyles((theme) => ({
  root: {
    height: 28,
  },
  input: {
    padding: theme.spacing(1),
  },
}));

export const Line = React.memo(
  withTheme((props: LineProps) => {
    const inputStyles = useInputStyles(props.theme);
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="span">
          跌至
        </Typography>
        <Box width={100} mx={1}>
          <props.PriceInput inputClasses={inputStyles} />
        </Box>
        <Typography variant="body1" component="span">
          买入
        </Typography>
        <Box width={80} mx={1}>
          <props.QuantityInput inputClasses={inputStyles} />
        </Box>
        <Typography variant="body1" component="span">
          股
        </Typography>
      </Box>
    );
  }),
);

export function createLine(): [React.ComponentType, LineStore] {
  const [PriceInput, priceStore] = createInput([nonEmpty, mustBeNumber]);
  const [QuantityInput, quantityStore] = createInput([nonEmpty, mustBeNumber]);
  const store = new LineStore({ priceStore, quantityStore });
  const Component = observer(() => (
    <Line PriceInput={PriceInput} QuantityInput={QuantityInput} />
  ));
  return [Component, store];
}
