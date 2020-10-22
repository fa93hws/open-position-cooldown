import { cleanup } from '@testing-library/react';
import * as React from 'react';

import { AboutPage } from '../about';

describe('AboutPage', () => {
  beforeEach(cleanup);

  it('renders it', () => {
    expect(<AboutPage />).toMatchRenderedSnapshot();
  });
});
