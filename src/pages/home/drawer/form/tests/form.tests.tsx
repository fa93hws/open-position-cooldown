import * as React from 'react';
import { shallow } from 'enzyme';

import { createForm, Form } from '../form';

describe('Form', () => {
  const BasicInfo = () => <div>BasicInfo</div>;
  const PriceExplain = () => <div>PriceExplain</div>;
  const Reason = () => <div>Reason</div>;
  const StrategyPanel = () => <div>StrategyPanel</div>;
  it('renders as follow', () => {
    expect(
      <Form
        onSubmit={jest.fn()}
        BasicInfo={BasicInfo}
        PriceExplain={PriceExplain}
        Reason={Reason}
        StrategyPanel={StrategyPanel}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('can be mounted', () => {
    const Component = createForm(jest.fn());
    expect(() => shallow(<Component />)).not.toThrow();
  });
});
