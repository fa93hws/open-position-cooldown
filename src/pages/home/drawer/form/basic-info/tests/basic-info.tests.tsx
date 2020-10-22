import { cleanup } from '@testing-library/react';
import * as React from 'react';

import { createBasicInfo } from '../basic-info';

describe('BasicInfo', () => {
  beforeEach(cleanup);

  it('renders the following', () => {
    const [BasicInfo, store] = createBasicInfo();
    store.datePickerStore.setDate(new Date('1999-02-04'));
    expect(
      <div>
        <BasicInfo />
      </div>,
    ).toMatchRenderedSnapshot();
  });
});
