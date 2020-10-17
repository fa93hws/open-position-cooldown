import { makeObservable, computed } from 'mobx';

import { InputStore } from '@ui/text-input/input-store';

export class LineStore {
  private readonly priceStore: InputStore;

  private readonly quantityStore: InputStore;

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
    });
  }

  get price() {
    return parseFloat(this.priceStore.value);
  }

  get quantity() {
    return parseInt(this.quantityStore.value, 10);
  }
}
