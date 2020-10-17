import { makeObservable, computed } from 'mobx';

import { InputStore } from '@ui/text-input/input-store';

export class LineStore {
  readonly priceStore: InputStore;

  readonly quantityStore: InputStore;

  constructor({
    priceStore,
    quantityStore,
  }: {
    priceStore: InputStore;
    quantityStore: InputStore;
  }) {
    this.priceStore = priceStore;
    this.quantityStore = quantityStore;
    makeObservable(this, {
      price: computed,
      quantity: computed,
      hasError: computed,
    });
  }

  get price() {
    return parseFloat(this.priceStore.value);
  }

  get quantity() {
    return parseInt(this.quantityStore.value, 10);
  }

  get hasError() {
    return this.priceStore.hasError || this.quantityStore.hasError;
  }

  startValidate() {
    this.priceStore.startValidate();
    this.quantityStore.startValidate();
  }
}
