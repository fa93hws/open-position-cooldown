import 'date-fns';
import * as React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { observer } from 'mobx-react';

import { DatePickerStore } from './date-picker-store';

// module resolution in esbuild and jest is a bit different?
const DateFnsUtils = require('@date-io/date-fns'); // eslint-disable-line

export function createDatePicker(): [React.ComponentType, DatePickerStore] {
  const store = new DatePickerStore();
  const onChange = (val: Date | null) => store.setDate(val);
  const Component = observer(() => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
    </MuiPickersUtilsProvider>
  ));
  return [Component, store];
}
