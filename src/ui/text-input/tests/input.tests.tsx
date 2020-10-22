import * as React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  getByPlaceholderText,
} from '@testing-library/react';

import { createInput, Input } from '../input';

describe('Input', () => {
  beforeEach(cleanup);

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

  it('is assign the value on change', () => {
    const [Component, store] = createInput([]);
    const { container } = render(<Component placeholder="foo" />);
    fireEvent.change(getByPlaceholderText(container, 'foo'), {
      target: { value: '123' },
    });
    expect(store.value).toEqual('123');
  });

  it('starts validating when blurred', () => {
    const [Component, store] = createInput([jest.fn().mockReturnValue(false)]);
    const { container } = render(<Component placeholder="foo" />);
    expect(store.hasError).toEqual(false);
    fireEvent.blur(getByPlaceholderText(container, 'foo'));
    expect(store.hasError).toEqual(true);
  });
});
