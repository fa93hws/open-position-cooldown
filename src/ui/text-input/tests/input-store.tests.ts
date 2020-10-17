import { InputStore } from '../input-store';

describe('InputStore', () => {
  it('has the following default values', () => {
    const store = new InputStore([jest.fn()]);
    expect(store.value).toEqual('');
    expect(store.hasError).toEqual(false);
    expect(store.shouldValidate).toEqual(false);
  });

  it('sets the value', () => {
    const store = new InputStore([jest.fn()]);
    store.setValue('aa');
    expect(store.value).toEqual('aa');
  });

  it('will not try validating before startValidate is called', () => {
    const store = new InputStore([jest.fn().mockReturnValue(false)]);
    store.setValue('aa');
    expect(store.hasError).toEqual(false);
    store.startValidate();
    expect(store.hasError).toEqual(true);
  });

  it('will check whether input is valid once startValidate is called', () => {
    const store = new InputStore([
      jest.fn().mockImplementation((str: string) => str !== 'no'),
    ]);
    store.startValidate();
    expect(store.hasError).toEqual(false);
    store.setValue('no');
    expect(store.hasError).toEqual(true);
  });

  it('will use all validator', () => {
    const validators = new Array(10).fill(jest.fn().mockReturnValue(true));
    validators.push(jest.fn().mockReturnValueOnce(false));

    const store = new InputStore(validators);
    store.startValidate();
    expect(store.hasError).toEqual(true);
  });
});
