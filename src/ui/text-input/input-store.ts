import { makeObservable, observable, action } from 'mobx';

export class InputStore {
  value = '';

  hasError = false;

  shouldValidate = false;

  constructor(
    private readonly validators: readonly ((val: string) => boolean)[],
  ) {
    makeObservable(this, {
      value: observable.ref,
      setValue: action,
      hasError: observable.ref,
    });
  }

  setValue(val: string) {
    this.value = val;
    if (!this.shouldValidate) {
      return;
    }
    this.hasError = this.validators.some((validator) => !validator(this.value));
  }

  startValidate() {
    this.shouldValidate = true;
    this.setValue(this.value);
  }
}
