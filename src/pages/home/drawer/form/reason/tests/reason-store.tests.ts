import { ReasonStore } from '../reason-store';

describe('ReasonStore', () => {
  it('sets the following default value', () => {
    const store = new ReasonStore();
    expect(store.reasons).toEqual([]);
  });

  it('adds a new reason with empty string', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    expect(store.reasons.length).toEqual(2);
  });

  it('removes the reason at given index', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    store.addReason();
    const firstReason = store.reasons[0];
    const thirdReason = store.reasons[2];
    store.removeReason(1);
    expect(store.reasons).toEqual([firstReason, thirdReason]);
  });

  it('get all input components in sequence', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    const FirsrComponent = store.reasons[0].Component;
    const SecondComponent = store.reasons[1].Component;
    expect(store.ReasonInputs).toEqual([FirsrComponent, SecondComponent]);
  });

  it('get all input value in sequence', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    const firstValue = store.reasons[0].store.value;
    const secondValue = store.reasons[1].store.value;
    expect(store.reasonStrings).toEqual([firstValue, secondValue]);
  });

  it('has error if one of the reason contains error', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    store.addReason();
    store.addReason();
    store.reasons[0].store.hasError = true;
    expect(store.hasError).toEqual(true);
  });

  it('has error if there is only two reasons', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    expect(store.hasError).toEqual(true);
  });

  it('let all input stores to start validate', () => {
    const store = new ReasonStore();
    store.addReason();
    store.addReason();
    store.addReason();
    store.startValidate();
    const shouldValidates = store.reasons.map(
      (reason) => reason.store.shouldValidate,
    );
    expect(shouldValidates).toEqual([true, true, true]);
  });

  it('resets the input', () => {
    const store = new ReasonStore();
    store.reset();
    expect(store.reasons.length).toEqual(3);
  });
});
