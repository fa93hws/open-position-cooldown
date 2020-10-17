import * as React from 'react';
import { shallow } from 'enzyme';

import { Strategy, createStrategyPanel } from '../strategy';

describe('Strategy', () => {
  it('renders the folowing', () => {
    const ListControlImpl = () => <div>ListControlImpl</div>;
    expect(
      <Strategy ListControlImpl={ListControlImpl} />,
    ).toMatchRenderedSnapshot();
  });

  it('is abled to be mounted', () => {
    const StrategyPanel = createStrategyPanel();
    expect(() => shallow(<StrategyPanel />)).not.toThrow();
  });
});
