import * as React from 'react';
import { shallow } from 'enzyme';

import { IntentionService } from '@services/intention/intention';
import { createHomeDrawer, HomeDrawer } from '../drawer';

describe('HomeDrawer', () => {
  const Form = () => <div>form</div>;
  it('renders an open drawer', () => {
    expect(
      <HomeDrawer open onClose={jest.fn()} Form={Form} />,
    ).toMatchRenderedSnapshot();
  });

  it('renders a closed drawer', () => {
    expect(
      <HomeDrawer open={false} onClose={jest.fn()} Form={Form} />,
    ).toMatchRenderedSnapshot();
  });

  it('can be mounted', () => {
    const intentionService = new IntentionService();
    const { Component } = createHomeDrawer(intentionService);
    expect(() => shallow(<Component />)).not.toThrow();
  });
});
