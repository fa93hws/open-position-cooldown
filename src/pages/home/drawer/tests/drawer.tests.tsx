import * as React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import { IntentionService } from '@services/intention/intention';
import { createHomeDrawer, HomeDrawer } from '../drawer';

describe('HomeDrawer', () => {
  const Form = () => <div>form</div>;
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
    const intentionService = new IntentionService();
    const { Component } = createHomeDrawer(intentionService);
    expect(() => shallow(<Component />)).not.toThrow();
  });
});
