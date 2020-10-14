import * as React from 'react';

import { Form } from '../form';

describe('Form', () => {
  const NameInput = () => <div>NameInput</div>;
  const CodeInput = () => <div>CodeInput</div>;
  const PriceInput = () => <div>PriceInput</div>;
  const MarketInput = () => <div>MarketInput</div>;
  it('renders as follow', () => {
    expect(
      <Form
        onSubmit={jest.fn()}
        NameInput={NameInput}
        CodeInput={CodeInput}
        PriceInput={PriceInput}
        MarketInput={MarketInput}
      />,
    ).toMatchRenderedSnapshot();
  });
});
