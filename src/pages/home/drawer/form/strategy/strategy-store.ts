import type { ComponentType } from 'react';
import { makeObservable, observable, action, computed } from 'mobx';

import { ExposedInputProps } from '@ui/text-input/input';
import { InputStore } from '@ui/text-input/input-store';
import { createLine } from './line/line';
import { LineStore } from './line/line-store';

export class StrategyStore {
  private readonly shitPriceStore: InputStore;

  private readonly currentPriceStore: InputStore;

  strategies: {
    Component: ComponentType<ExposedInputProps>;
    store: LineStore;
  }[] = [];

  shouldShowRemove = false;

  constructor({
    shitPriceStore,
    currentPriceStore,
  }: {
    shitPriceStore: InputStore;
    currentPriceStore: InputStore;
  }) {
    this.shitPriceStore = shitPriceStore;
    this.currentPriceStore = currentPriceStore;
    makeObservable(this, {
      strategies: observable.deep,
      shouldShowRemove: observable.ref,
      addStrategy: action,
      removeStrategy: action,
      StrategyLines: computed,
      strategyPlan: computed,
      hasError: computed,
      setRemoveVisibility: action,
      reset: action,
    });
  }

  get initialQuantity(): number {
    return parseInt(this.currentPriceStore.value, 10);
  }

  get shitPrice(): number {
    return parseFloat(this.shitPriceStore.value);
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

  get hasError() {
    return (
      this.shitPriceStore.hasError ||
      this.currentPriceStore.hasError ||
      this.strategies.some(({ store }) => store.hasError)
    );
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

  reset() {
    this.shitPriceStore.reset();
    this.currentPriceStore.reset();
    this.strategies = [];
    this.addStrategy();
  }
}
