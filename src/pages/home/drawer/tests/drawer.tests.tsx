import * as React from 'react';
import { HomeDrawer } from '../drawer';

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
});
