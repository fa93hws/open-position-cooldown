import * as React from 'react';
import { fireEvent, getByRole, render, cleanup } from '@testing-library/react';

import { ListControl } from '../list-control';

describe('ListControl', () => {
  afterEach(cleanup);

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
          removeChecked={false}
        />
      </div>
    );
    const { container } = render(jsxElement);
    fireEvent.click(getByRole(container, 'switch'));
    expect(onRemoveChange).toHaveBeenNthCalledWith(1, true);
    fireEvent.click(getByRole(container, 'switch'));
    expect(onRemoveChange).toHaveBeenNthCalledWith(2, true);
  });
});
