import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { Strategy, createStrategyPanel } from '../strategy';

describe('Strategy', () => {
  it('renders the strategy panel without lines', () => {
    const ListControlImpl = () => <div>ListControlImpl</div>;
    const CurrentPriceInput = () => <div>CurrentPriceInput</div>;
    const ShitPriceInput = () => <div>ShitPriceInput</div>;
    const Lines: any[] = [];
    expect(
      <Strategy
        ListControlImpl={ListControlImpl}
        Lines={Lines}
        CurrentQuantityInput={CurrentPriceInput}
        ShitPriceInput={ShitPriceInput}
        shouldShowRemove={false}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the strategy panel with two lines', () => {
    const ListControlImpl = () => <div>ListControlImpl</div>;
    const CurrentPriceInput = () => <div>CurrentPriceInput</div>;
    const ShitPriceInput = () => <div>ShitPriceInput</div>;
    const Lines = [() => <div>strategy 1</div>, () => <div>strategy 2</div>];
    expect(
      <Strategy
        ListControlImpl={ListControlImpl}
        Lines={Lines}
        CurrentQuantityInput={CurrentPriceInput}
        ShitPriceInput={ShitPriceInput}
        shouldShowRemove={false}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the strategy panel with two lines and remove icon button', () => {
    const ListControlImpl = () => <div>ListControlImpl</div>;
    const CurrentPriceInput = () => <div>CurrentPriceInput</div>;
    const ShitPriceInput = () => <div>ShitPriceInput</div>;
    const Lines = [() => <div>strategy 1</div>, () => <div>strategy 2</div>];
    expect(
      <Strategy
        ListControlImpl={ListControlImpl}
        Lines={Lines}
        CurrentQuantityInput={CurrentPriceInput}
        ShitPriceInput={ShitPriceInput}
        shouldShowRemove={true}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('is abled to be mounted', () => {
    const [StrategyPanel] = createStrategyPanel();
    expect(() => shallow(<StrategyPanel />)).not.toThrow();
  });

  it('show one strategy by default', () => {
    const [, store] = createStrategyPanel();
    expect(store.strategies.length).toEqual(1);
  });

  it('remove the input at idx when remove is clicked', () => {
    const [Component, store] = createStrategyPanel();
    store.addStrategy();
    store.addStrategy();
    store.setRemoveVisibility(true);
    const strategies = [...store.strategies];
    const element = mount(<Component />);
    element.find('button#remove-1').simulate('click');
    expect(store.strategies).toEqual([strategies[0], strategies[2]]);
  });
});
