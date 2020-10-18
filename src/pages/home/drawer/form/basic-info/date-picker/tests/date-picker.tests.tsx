import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

import { createDatePicker } from '../date-picker';

describe('DatePicker', () => {
  // esbuild's module resolution is a bit different from that in jest
  const DateFnsUtils = require('@date-io/date-fns').default; // eslint-disable-line

  it('renders the following', () => {
    const [DatePicker] = createDatePicker();
    expect(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker />
      </MuiPickersUtilsProvider>,
    ).toMatchRenderedSnapshot();
  });
});
