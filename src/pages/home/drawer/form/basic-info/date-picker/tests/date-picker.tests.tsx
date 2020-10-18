import 'date-fns';
import * as React from 'react';

import { createDatePicker } from '../date-picker';

describe('DatePicker', () => {
  it('renders the following', () => {
    const [DatePicker] = createDatePicker();
    expect(<DatePicker />).toMatchRenderedSnapshot();
  });
});
