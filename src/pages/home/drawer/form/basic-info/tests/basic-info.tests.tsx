import * as React from 'react';

import { createBasicInfo } from '../basic-info';

describe('BasicInfo', () => {
  it('renders the following', () => {
    const [BasicInfo] = createBasicInfo();
    expect(<BasicInfo />).toMatchRenderedSnapshot();
  });
});
