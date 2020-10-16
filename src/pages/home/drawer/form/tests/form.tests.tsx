import * as React from 'react';
import { shallow } from 'enzyme';

import { createForm, Form } from '../form';

describe('Form', () => {
  const BasicInfo = () => <div>BasicInfo</div>;
  const PriceExplain = () => <div>PriceExplain</div>;
  const Reason = () => <div>Reason</div>;
  it('renders as follow', () => {
    expect(
      <Form
        onSubmit={jest.fn()}
        BasicInfo={BasicInfo}
        PriceExplain={PriceExplain}
        Reason={Reason}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('can be mounted', () => {
    const Component = createForm();
    expect(() => shallow(<Component />)).not.toThrow();
  });
});
