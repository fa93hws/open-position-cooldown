import type { ComponentType } from 'react';
import { makeObservable, observable, action, computed } from 'mobx';

import { ExposedInputProps } from '@ui/text-input/input';
import { createLine } from './line/line';
import { LineStore } from './line/line-store';

export class StrategyStore {
  strategies: {
    Component: ComponentType<ExposedInputProps>;
    store: LineStore;
  }[] = [];

  shouldShowRemove = false;

  constructor() {
    makeObservable(this, {
      strategies: observable.deep,
      shouldShowRemove: observable.ref,
      addStrategy: action,
      removeStrategy: action,
      StrategyLines: computed,
      strategyPlan: computed,
      strategyErrors: computed,
      setRemoveVisibility: action,
    });
  }

  get StrategyLines(): ComponentType<ExposedInputProps>[] {
    return this.strategies.map((strategy) => strategy.Component);
  }

  get strategyPlan() {
    return this.strategies.map(({ store }) => ({
      quantity: store.quantity,
      price: store.price,
    }));
  }

  get strategyErrors() {
    return this.strategies.map(({ store }) => store.hasError);
  }

  addStrategy() {
    const [Component, store] = createLine();
    this.strategies.push({ Component, store });
    return store;
  }

  removeStrategy(idx: number) {
    this.strategies.splice(idx, 1);
  }

  setRemoveVisibility(val: boolean) {
    this.shouldShowRemove = val;
  }

  startValidate() {
    this.strategies.forEach(({ store }) => store.startValidate());
  }
}
