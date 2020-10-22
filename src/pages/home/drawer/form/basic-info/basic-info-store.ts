import type { InputStore } from '@ui/text-input/input-store';
import type { DatePickerStore } from './date-picker/date-picker-store';

export class BasicInfoStore {
  readonly nameStore: InputStore;

  readonly priceStore: InputStore;

  readonly codeStore: InputStore;

  readonly marketStore: InputStore;

  readonly datePickerStore: DatePickerStore;

  constructor(params: {
    nameStore: InputStore;
    priceStore: InputStore;
    codeStore: InputStore;
    marketStore: InputStore;
    datePickerStore: DatePickerStore;
  }) {
    this.nameStore = params.nameStore;
    this.priceStore = params.priceStore;
    this.codeStore = params.codeStore;
    this.marketStore = params.marketStore;
    this.datePickerStore = params.datePickerStore;
  }

  get name() {
    return this.nameStore.value;
  }

  get price() {
    return this.priceStore.value;
  }

  get priceAsNum() {
    return parseFloat(this.price);
  }

  get code() {
    return this.codeStore.value;
  }

  get market() {
    return this.marketStore.value;
  }

  get hasError() {
    return (
      this.nameStore.hasError ||
      this.priceStore.hasError ||
      this.codeStore.hasError ||
      this.marketStore.hasError
    );
  }

  get date() {
    return this.datePickerStore.asDateString();
  }

  startValidate() {
    this.nameStore.startValidate();
    this.priceStore.startValidate();
    this.codeStore.startValidate();
    this.marketStore.startValidate();
  }

  reset() {
    this.nameStore.reset();
    this.priceStore.reset();
    this.codeStore.reset();
    this.marketStore.reset();
    this.datePickerStore.reset();
  }
}
