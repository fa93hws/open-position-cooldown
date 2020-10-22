import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import { createLine, Line } from '../line';

describe('Line', () => {
  beforeEach(cleanup);

  it('renders the following', () => {
    const PriceInput = () => <div>PriceInput</div>;
    const QuantityInput = () => <div>QuantityInput</div>;
    expect(
      <Line PriceInput={PriceInput} QuantityInput={QuantityInput} />,
    ).toMatchRenderedSnapshot();
  });

  it('is able to be mounted', () => {
    const [Component] = createLine();
    expect(() => render(<Component />)).not.toThrowError();
  });
});
