import * as React from 'react';
import { mount } from 'enzyme';

import { ListControl } from '../list-control';

describe('ListControl', () => {
  it('renders the list control when the switch is false', () => {
    expect(
      <div>
        <ListControl
          onAddClick={jest.fn()}
          onRemoveChange={jest.fn()}
          removeChecked={false}
        />
      </div>,
    ).toMatchRenderedSnapshot();
  });

  it('renders the list control when the switch is true', () => {
    expect(
      <div>
        <ListControl
          onAddClick={jest.fn()}
          onRemoveChange={jest.fn()}
          removeChecked={true}
        />
      </div>,
    ).toMatchRenderedSnapshot();
  });

  it('can display remove icon by switch', () => {
    const onRemoveChange = jest.fn();
    const jsxElement = (
      <div>
        <ListControl
          onAddClick={jest.fn()}
          onRemoveChange={onRemoveChange}
          removeChecked={true}
        />
      </div>
    );
    const element = mount(jsxElement);
    element
      .find('input#switch')
      .simulate('change', { target: { checked: true } });
    expect(onRemoveChange).toHaveBeenCalledWith(true);
  });
});
