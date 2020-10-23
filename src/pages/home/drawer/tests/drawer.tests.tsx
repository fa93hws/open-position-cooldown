import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import { IntentionService } from '@services/intention/intention';
import { createHomeDrawer, HomeDrawer } from '../drawer';

describe('HomeDrawer', () => {
  const Form = () => <div>form</div>;

  afterEach(cleanup);

  it('renders an open drawer', () => {
    expect(
      render(<HomeDrawer open onClose={jest.fn()} Form={Form} />).baseElement,
    ).toMatchSnapshot();
  });

  it('renders a closed drawer', () => {
    expect(
      render(<HomeDrawer open onClose={jest.fn()} Form={Form} />).baseElement,
    ).toMatchSnapshot();
  });

  it('can be mounted', () => {
    const intentionService = new IntentionService({} as any);
    const { Component } = createHomeDrawer(intentionService);
    expect(() => render(<Component />)).not.toThrow();
  });
});
