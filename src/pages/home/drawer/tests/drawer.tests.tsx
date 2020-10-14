import * as React from 'react';
import { HomeDrawer } from '../drawer';

describe('HomeDrawer', () => {
  it('renders an open drawer', () => {
    expect(<HomeDrawer open onClose={jest.fn()} />).toMatchRenderedSnapshot();
  });

  it('renders a closed drawer', () => {
    expect(
      <HomeDrawer open={false} onClose={jest.fn()} />,
    ).toMatchRenderedSnapshot();
  });
});
