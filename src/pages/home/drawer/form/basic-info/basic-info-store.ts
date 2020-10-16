import { InputStore } from '../input/input-store';

export class BasicInfoStore {
  private readonly nameStore: InputStore;

  private readonly priceStore: InputStore;

  private readonly codeStore: InputStore;

  private readonly marketStore: InputStore;

  constructor(params: {
    nameStore: InputStore;
    priceStore: InputStore;
    codeStore: InputStore;
    marketStore: InputStore;
  }) {
    this.nameStore = params.nameStore;
    this.priceStore = params.priceStore;
    this.codeStore = params.codeStore;
    this.marketStore = params.marketStore;
  }

  get name() {
    return this.nameStore.value;
  }

  get price() {
    return this.priceStore.value;
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

  startValidate() {
    this.nameStore.startValidate();
    this.priceStore.startValidate();
    this.codeStore.startValidate();
    this.marketStore.startValidate();
  }
}
