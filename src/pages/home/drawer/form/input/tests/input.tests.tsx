import * as React from 'react';

import { Input } from '../input';

describe('Input', () => {
  it('renders with value', () => {
    expect(
      <Input
        value="hello world"
        error={false}
        label="label"
        onChange={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders with value with error', () => {
    expect(
      <Input
        value="hello world"
        error={true}
        label="label"
        onChange={jest.fn()}
        onBlur={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });
});
