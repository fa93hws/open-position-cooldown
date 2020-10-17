import * as React from 'react';
import { shallow } from 'enzyme';

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
      />,
    ).toMatchRenderedSnapshot();
  });

  it('is abled to be mounted', () => {
    const StrategyPanel = createStrategyPanel();
    expect(() => shallow(<StrategyPanel />)).not.toThrow();
  });
});
