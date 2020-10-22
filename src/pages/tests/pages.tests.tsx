import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

import { Pages } from '../pages';

describe('Pages', () => {
  beforeEach(cleanup);

  it('is able to be mounted', () => {
    expect(() =>
      render(
        <MemoryRouter>
          <Pages />
        </MemoryRouter>,
      ),
    ).not.toThrow();
  });
});
