import 'date-fns';
import * as React from 'react';

import { createDatePicker } from '../date-picker';

describe('DatePicker', () => {
  it('renders the following', () => {
    const [DatePicker, store] = createDatePicker();
    store.setDate(new Date('1999-02-04'));
    expect(<DatePicker />).toMatchRenderedSnapshot();
  });
});
