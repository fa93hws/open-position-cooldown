import * as React from 'react';
import { mount } from 'enzyme';

import { createReasonSection, ReasonSection } from '../reason';

describe('ReasonSection', () => {
  it('renders the section without any inputs', () => {
    expect(
      <ReasonSection
        ReasonsInput={[]}
        onAddClick={jest.fn()}
        shouldShowRemove={false}
        onSwitchChange={jest.fn()}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the section with two input', () => {
    expect(
      <ReasonSection
        ReasonsInput={[() => <div>input 1</div>, () => <div>input 2</div>]}
        onAddClick={jest.fn()}
        shouldShowRemove={false}
        onSwitchChange={jest.fn()}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the section with two input and remove icon', () => {
    expect(
      <ReasonSection
        ReasonsInput={[() => <div>input 1</div>, () => <div>input 2</div>]}
        onAddClick={jest.fn()}
        shouldShowRemove
        onSwitchChange={jest.fn()}
        onRemoveClick={jest.fn()}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('show three reasons by default', () => {
    const [, store] = createReasonSection();
    expect(store.reasons.length).toEqual(3);
  });

  it('can display remove icon by switch', () => {
    const [Component, store] = createReasonSection();
    const element = mount(<Component />);
    element
      .find('input#switch')
      .simulate('change', { target: { checked: true } });
    expect(store.shouldShowRemove).toEqual(true);
  });

  it('adds an input when add is clicked', () => {
    const [Component, store] = createReasonSection();
    const element = mount(<Component />);
    element.find('button#add-reason').simulate('click');
    expect(store.reasons.length).toEqual(4);
  });

  it('remove the input at idx when remove is clicked', () => {
    const [Component, store] = createReasonSection();
    store.shouldShowRemove = true;
    const reasons = [...store.reasons];
    const element = mount(<Component />);
    element.find('button#remove-1').simulate('click');
    expect(store.reasons).toEqual([reasons[0], reasons[2]]);
  });
});
