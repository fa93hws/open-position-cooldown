import * as React from 'react';

import { HomePage } from '../home';

describe('HomePage', () => {
  it('renders this', () => {
    const IconButton = () => (
      <button>
        <i>icon!</i>
      </button>
    );
    const Sheet = () => <div>sheet!</div>;
    expect(
      <HomePage IconButton={IconButton} Sheet={Sheet} />,
    ).toMatchRenderedSnapshot();
  });
});
