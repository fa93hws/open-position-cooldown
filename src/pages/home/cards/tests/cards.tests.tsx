import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import { createCards } from '../cards';

describe('Cards', () => {
  beforeEach(cleanup);

  it('should not throw', () => {
    const [Component] = createCards({} as any);
    expect(() => render(<Component />)).not.toThrow();
  });
});
