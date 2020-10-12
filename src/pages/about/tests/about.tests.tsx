import * as React from 'react';
import { AboutPage } from '../about';

describe('AboutPage', () => {
  it('renders it', () => {
    expect(<AboutPage />).toMatchRenderedSnapshot();
  });
});
