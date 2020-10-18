import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

import { createDatePicker } from '../date-picker';

describe('DatePicker', () => {
  it('renders the following', () => {
    const DateFnsUtils = require('@date-io/date-fns'); // eslint-disable-line
    const [DatePicker] = createDatePicker();
    expect(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker />
      </MuiPickersUtilsProvider>,
    ).toMatchRenderedSnapshot();
  });
});
