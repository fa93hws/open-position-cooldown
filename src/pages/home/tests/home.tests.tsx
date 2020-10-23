import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import { createHomePage, HomePage } from '../home';

describe('HomePage', () => {
  beforeEach(cleanup);

  it('renders this', () => {
    const IconButton = () => (
      <button>
        <i>icon!</i>
      </button>
    );
    const Sheet = () => <div>sheet!</div>;
    const Cards = () => <div>Cards!</div>;
    expect(
      <HomePage
        IconButton={IconButton}
        Sheet={Sheet}
        Cards={Cards}
        onMount={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('is able to be mounted', () => {
    const Component = createHomePage();
    expect(() => render(<Component />)).not.toThrow();
  });
});
