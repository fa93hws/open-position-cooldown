import * as React from 'react';

import { Footer } from '../footer';

describe('Footer', () => {
  it('renders it', () => {
    expect(<Footer />).toMatchRenderedSnapshot();
  });
});
