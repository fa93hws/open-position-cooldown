import * as React from 'react';

import { Header } from '../header';

describe('Header', () => {
  it('renders this', () => {
    expect(<Header />).toMatchRenderedSnapshot();
  });
});
