import { cleanup } from '@testing-library/react';
import * as React from 'react';

import { AddButton } from '../add-button';

describe('AddButton', () => {
  beforeEach(cleanup);

  it('renders this', () => {
    expect(<AddButton onClick={jest.fn()} />).toMatchRenderedSnapshot();
  });
});
