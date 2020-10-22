import * as React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  getAllByTitle,
} from '@testing-library/react';

import { createReasonSection, ReasonSection } from '../reason';

describe('ReasonSection', () => {
  const ListControlImpl = () => <div>ListControl</div>;

  beforeEach(cleanup);

  it('renders the section without any inputs', () => {
    expect(
      <ReasonSection
        ReasonsInput={[]}
        ListControlImpl={ListControlImpl}
        shouldShowRemove={false}
        onRemoveClick={jest.fn()}
        hasError={false}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the section with two input', () => {
    expect(
      <ReasonSection
        ReasonsInput={[() => <div>input 1</div>, () => <div>input 2</div>]}
        ListControlImpl={ListControlImpl}
        shouldShowRemove={false}
        onRemoveClick={jest.fn()}
        hasError={false}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the section with two input and remove icon', () => {
    expect(
      <ReasonSection
        ReasonsInput={[() => <div>input 1</div>, () => <div>input 2</div>]}
        ListControlImpl={ListControlImpl}
        shouldShowRemove
        onRemoveClick={jest.fn()}
        hasError={false}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('show three reasons by default', () => {
    const [, store] = createReasonSection();
    expect(store.reasons.length).toEqual(3);
  });

  it('remove the input at idx when remove is clicked', () => {
    const [Component, store] = createReasonSection();
    store.setRemoveVisibility(true);
    const reasons = [...store.reasons];
    const { container } = render(<Component />);
    const removeButtons = getAllByTitle(container, 'remove');
    expect(removeButtons.length).toEqual(3);
    fireEvent.click(removeButtons[1]);
    expect(store.reasons).toEqual([reasons[0], reasons[2]]);
  });
});
