import { InputStore } from '@ui/text-input/input-store';
import { BasicInfoStore } from '../basic-info-store';
import { DatePickerStore } from '../date-picker/date-picker-store';

describe('BasicInfoStore', () => {
  function createStores() {
    return {
      nameStore: new InputStore([]),
      codeStore: new InputStore([]),
      priceStore: new InputStore([]),
      marketStore: new InputStore([]),
      datePickerStore: new DatePickerStore(),
    };
  }

  it('initialize the store with the given ones', () => {
    const stores = createStores();
    stores.codeStore.setValue('hello');
    stores.marketStore.setValue('market');
    stores.nameStore.setValue('name');
    stores.priceStore.setValue('1.23');
    const basicInfoStore = new BasicInfoStore(stores);
    expect(basicInfoStore.code).toEqual('hello');
    expect(basicInfoStore.market).toEqual('market');
    expect(basicInfoStore.name).toEqual('name');
    expect(basicInfoStore.price).toEqual('1.23');
  });

  it('sets the value in sub store will reflect on basic info store', () => {
    const stores = createStores();
    const basicInfoStore = new BasicInfoStore(stores);
    stores.codeStore.setValue('code');
    expect(basicInfoStore.code).toEqual('code');
  });

  it('has error if one of the sub stores has error', () => {
    const stores = createStores();
    const basicInfoStore = new BasicInfoStore(stores);
    expect(basicInfoStore.hasError).toEqual(false);
    stores.codeStore.hasError = true;
    expect(basicInfoStore.hasError).toEqual(true);
  });

  it('start validate all substores', () => {
    const stores = createStores();
    const basicInfoStore = new BasicInfoStore(stores);
    basicInfoStore.startValidate();
    expect(stores.codeStore.shouldValidate).toEqual(true);
    expect(stores.nameStore.shouldValidate).toEqual(true);
    expect(stores.marketStore.shouldValidate).toEqual(true);
    expect(stores.priceStore.shouldValidate).toEqual(true);
  });

  it('start resets all substores', () => {
    const stores = createStores();
    const basicInfoStore = new BasicInfoStore(stores);
    basicInfoStore.startValidate();
    basicInfoStore.reset();
    expect(stores.codeStore.shouldValidate).toEqual(false);
    expect(stores.nameStore.shouldValidate).toEqual(false);
    expect(stores.marketStore.shouldValidate).toEqual(false);
    expect(stores.priceStore.shouldValidate).toEqual(false);
  });
});
