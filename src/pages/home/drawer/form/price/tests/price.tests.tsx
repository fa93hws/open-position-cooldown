import { cleanup } from '@testing-library/react';
import * as React from 'react';

import { createPriceExplain } from '../price';

describe('Price', () => {
  beforeEach(cleanup);

  it('renders the following', () => {
    const [Component] = createPriceExplain();
    expect(<Component />).toMatchRenderedSnapshot();
  });
});
