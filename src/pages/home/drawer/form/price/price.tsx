import * as React from 'react';
import { Typography, Box } from '@material-ui/core';

import type { InputStore } from '../input/input-store';
import { createInput, ExposedInputProps } from '../input/input';
import { nonEmpty } from '../validator';

type PriceProps = {
  InputComponent: React.ComponentType<ExposedInputProps>;
};
const Price = React.memo((props: PriceProps) => (
  <Box>
    <Typography variant="h6" component="h4" gutterBottom>
      为什么当前价格可以买入？
    </Typography>
    <props.InputComponent multiline placeholder="可换行" />
  </Box>
));

export function createPriceExplain(): [React.ComponentType, InputStore] {
  const [InputComponent, store] = createInput([nonEmpty]);
  const Component = () => <Price InputComponent={InputComponent} />;
  return [Component, store];
}
