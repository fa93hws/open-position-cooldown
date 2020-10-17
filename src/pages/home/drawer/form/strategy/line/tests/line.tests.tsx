import * as React from 'react';
import { shallow } from 'enzyme';

import { createLine, Line } from '../line';

describe('Line', () => {
  it('renders the following', () => {
    const PriceInput = () => <div>PriceInput</div>;
    const QuantityInput = () => <div>QuantityInput</div>;
    expect(
      <Line PriceInput={PriceInput} QuantityInput={QuantityInput} />,
    ).toMatchRenderedSnapshot();
  });

  it('is able to be mounted', () => {
    const [Component] = createLine();
    expect(() => shallow(<Component />)).not.toThrowError();
  });
});
