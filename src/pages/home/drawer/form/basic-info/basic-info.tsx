import * as React from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';

import { BasicInfoStore } from './basic-info-store';
import { createInput } from '../input/input';
import { nonEmpty, mustBeNumber } from '../validator';

export function createBasicInfo(): [React.ComponentType, BasicInfoStore] {
  const [NameInput, nameStore] = createInput([nonEmpty]);
  const [CodeInput, codeStore] = createInput([nonEmpty]);
  const [PriceInput, priceStore] = createInput([nonEmpty, mustBeNumber]);
  const [MarketInput, marketStore] = createInput([nonEmpty]);
  const store = new BasicInfoStore({
    nameStore,
    codeStore,
    priceStore,
    marketStore,
  });

  const Component = observer(() => (
    <>
      <Box marginBottom={1}>
        <NameInput label="股票名" />
      </Box>
      <Box marginBottom={1}>
        <CodeInput label="代码" />
      </Box>
      <Box marginBottom={1}>
        <PriceInput label="价格" />
      </Box>
      <Box marginBottom={2}>
        <MarketInput label="市场" />
      </Box>
    </>
  ));
  return [Component, store];
}
