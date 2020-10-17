/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { mount } from 'enzyme';

import { createInput, Input } from '../input';

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

  it('is assign the value on change', () => {
    const [Component, store] = createInput([]);
    const element = mount(<Component label="a" />);
    element.find('input').simulate('change', { target: { value: '123' } });
    expect(store.value).toEqual('123');
  });

  it('starts validating when blurred', () => {
    const [Component, store] = createInput([jest.fn().mockReturnValue(false)]);
    const element = mount(<Component label="a" />);
    expect(store.hasError).toEqual(false);
    element.find('input').simulate('blur');
    expect(store.hasError).toEqual(true);
  });
});
