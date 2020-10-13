import * as React from 'react';

import { AddButton } from '../add-button';

describe('AddButton', () => {
  it('renders this', () => {
    expect(<AddButton />).toMatchRenderedSnapshot();
  });
});
