import * as React from 'react';

import { HomePage } from '../home';

describe('HomePage', () => {
  it('renders this', () => {
    const IconButton = () => (
      <button>
        <i>icon!</i>
      </button>
    );
    expect(<HomePage IconButton={IconButton} />).toMatchRenderedSnapshot();
  });
});
