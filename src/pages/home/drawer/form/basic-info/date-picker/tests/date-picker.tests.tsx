import { cleanup } from '@testing-library/react';
import 'date-fns';
import * as React from 'react';

import { createDatePicker } from '../date-picker';

describe('DatePicker', () => {
  beforeEach(cleanup);

  it('renders the following', () => {
    const [DatePicker, store] = createDatePicker();
    store.setDate(new Date('1999-02-04'));
    expect(<DatePicker />).toMatchRenderedSnapshot();
  });
});
