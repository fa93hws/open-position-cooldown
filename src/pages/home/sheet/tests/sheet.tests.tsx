import * as React from 'react';

import { Sheet } from '../sheet';

describe('Sheet', () => {
  it('renders it', () => {
    expect(
      <Sheet
        onClose={jest.fn()}
        onMount={jest.fn()}
        hasTransform={false}
        animationTime={300}
      />,
    ).toMatchRenderedSnapshot();
  });
});
