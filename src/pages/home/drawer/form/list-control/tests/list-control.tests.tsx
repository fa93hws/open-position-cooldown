/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { mount } from 'enzyme';

import { ListControl } from '../list-control';

describe('ListControl', () => {
  it('renders the list control when the switch is false', () => {
    expect(
      <ListControl
        onAddClick={jest.fn()}
        onRemoveChange={jest.fn()}
        removeChecked={false}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the list control when the switch is true', () => {
    expect(
      <ListControl
        onAddClick={jest.fn()}
        onRemoveChange={jest.fn()}
        removeChecked={true}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('can display remove icon by switch', () => {
    const onRemoveChange = jest.fn();
    const jsxElement = (
      <ListControl
        onAddClick={jest.fn()}
        onRemoveChange={onRemoveChange}
        removeChecked={true}
      />
    );
    const element = mount(jsxElement);
    element
      .find('input#switch')
      .simulate('change', { target: { checked: true } });
    expect(onRemoveChange).toHaveBeenCalledWith(true);
  });
});
