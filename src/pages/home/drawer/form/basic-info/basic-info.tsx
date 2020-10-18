import * as React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography } from '@material-ui/core';
import { createInput } from '@ui/text-input/input';
import { nonEmpty, mustBeNumber } from '@ui/text-input/validator';
import { BasicInfoStore } from './basic-info-store';
import { createDatePicker } from './date-picker/date-picker';

export function createBasicInfo(): [React.ComponentType, BasicInfoStore] {
  const [NameInput, nameStore] = createInput([nonEmpty]);
  const [CodeInput, codeStore] = createInput([nonEmpty]);
  const [PriceInput, priceStore] = createInput([nonEmpty, mustBeNumber]);
  const [MarketInput, marketStore] = createInput([nonEmpty]);
  const [DatePickerInput, datePickerStore] = createDatePicker();
  const store = new BasicInfoStore({
    nameStore,
    codeStore,
    priceStore,
    marketStore,
    datePickerStore,
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
      <Box marginBottom={1}>
        <MarketInput label="市场" />
      </Box>
      <Box
        marginBottom={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1" component="span">
          日期:
        </Typography>
        <DatePickerInput />
      </Box>
    </>
  ));
  return [Component, store];
}
