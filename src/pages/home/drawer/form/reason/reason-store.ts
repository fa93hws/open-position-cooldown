import type { ComponentType } from 'react';
import { makeObservable, observable, action, computed } from 'mobx';

import { nonEmpty } from '@ui/text-input/validator';
import { InputStore } from '@ui/text-input/input-store';
import { createInput, ExposedInputProps } from '@ui/text-input/input';

export class ReasonStore {
  reasons: {
    Component: ComponentType<ExposedInputProps>;
    store: InputStore;
  }[] = [];

  shouldShowRemove = false;

  constructor() {
    makeObservable(this, {
      reasons: observable.deep,
      shouldShowRemove: observable.ref,
      addReason: action,
      removeReason: action,
      ReasonInputs: computed,
      setRemoveVisibility: action,
      reset: action,
      hasError: computed,
    });
  }

  get ReasonInputs(): ComponentType<ExposedInputProps>[] {
    return this.reasons.map((reason) => reason.Component);
  }

  get reasonStrings(): string[] {
    return this.reasons.map((reason) => reason.store.value);
  }

  get hasError(): boolean {
    return (
      this.reasons.length < 3 ||
      this.reasons.some((reason) => reason.store.hasError)
    );
  }

  addReason(): InputStore {
    const [Component, store] = createInput([nonEmpty]);
    this.reasons.push({ Component, store });
    return store;
  }

  removeReason(idx: number) {
    this.reasons.splice(idx, 1);
  }

  setRemoveVisibility(val: boolean) {
    this.shouldShowRemove = val;
  }

  startValidate() {
    this.reasons.forEach(({ store }) => store.startValidate());
  }

  reset() {
    this.reasons = [];
    this.addReason();
    this.addReason();
    this.addReason();
  }
}
