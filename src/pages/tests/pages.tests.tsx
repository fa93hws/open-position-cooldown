import * as React from 'react';
import { shallow } from 'enzyme';

import { Pages } from '../pages';

describe('Pages', () => {
  it('is able to be mounted', () => {
    expect(() => shallow(<Pages />)).not.toThrow();
  });
});
