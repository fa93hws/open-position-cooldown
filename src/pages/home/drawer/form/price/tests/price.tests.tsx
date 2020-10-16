import * as React from 'react';

import { createPriceExplain } from '../price';

describe('Price', () => {
  it('renders the following', () => {
    const [Component] = createPriceExplain();
    expect(<Component />).toMatchRenderedSnapshot();
  });
});
