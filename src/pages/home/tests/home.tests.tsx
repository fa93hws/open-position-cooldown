import * as React from 'react';
import { shallow } from 'enzyme';

import { createHomePage, HomePage } from '../home';

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

  it('is able to be mounted', () => {
    const Component = createHomePage();
    expect(() => shallow(<Component />)).not.toThrow();
  });
});
