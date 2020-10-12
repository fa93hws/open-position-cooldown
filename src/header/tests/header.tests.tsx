import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '../header';

describe('Header', () => {
  it('renders this', () => {
    expect(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
