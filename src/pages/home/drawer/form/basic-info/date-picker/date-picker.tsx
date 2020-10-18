import * as React from 'react';
import { DatePicker } from '@material-ui/pickers';
import { observer } from 'mobx-react';

import { DatePickerStore } from './date-picker-store';

export function createDatePicker(): [React.ComponentType, DatePickerStore] {
  const store = new DatePickerStore();
  const onChange = (val: Date | null) => store.setDate(val);
  const Component = observer(() => (
    <DatePicker
      format="yyyy-MM-dd"
      value={store.date}
      onChange={onChange}
      autoOk
      disableFuture
      disableToolbar
      inputVariant="outlined"
      size="small"
    />
  ));
  return [Component, store];
}
