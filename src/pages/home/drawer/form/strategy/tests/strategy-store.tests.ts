import { InputStore } from '@ui/text-input/input-store';
import { StrategyStore } from '../strategy-store';

describe('ReasonStore', () => {
  const shitPriceStore = new InputStore([]);
  const currentPriceStore = new InputStore([]);
  it('sets the following default value', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    expect(store.strategies).toEqual([]);
  });

  it('adds a new reason with empty string', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    store.addStrategy();
    store.addStrategy();
    expect(store.strategies.length).toEqual(2);
  });

  it('removes the reason at given index', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    store.addStrategy();
    store.addStrategy();
    store.addStrategy();
    const firstStrategy = store.strategies[0];
    const thirdStrategy = store.strategies[2];
    store.removeStrategy(1);
    expect(store.strategies).toEqual([firstStrategy, thirdStrategy]);
  });

  it('get all input components in sequence', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    store.addStrategy();
    store.addStrategy();
    const FirsrComponent = store.strategies[0].Component;
    const SecondComponent = store.strategies[1].Component;
    expect(store.StrategyLines).toEqual([FirsrComponent, SecondComponent]);
  });

  it('get all input value in sequence', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    const store0 = store.addStrategy();
    store0.priceStore.setValue('1');
    store0.quantityStore.setValue('11');
    const store1 = store.addStrategy();
    store1.priceStore.setValue('2');
    store1.quantityStore.setValue('22');
    expect(store.strategyPlan).toEqual([
      { price: 1, quantity: 11 },
      { price: 2, quantity: 22 },
    ]);
  });

  it('has error if one of the strategy has', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    const store0 = store.addStrategy();
    store0.priceStore.hasError = true;
    store.addStrategy();
    expect(store.hasError).toEqual(true);
  });

  it('has error if shit price has', () => {
    const shitPriceStore1 = new InputStore([]);
    const store = new StrategyStore({
      shitPriceStore: shitPriceStore1,
      currentPriceStore,
    });
    store.addStrategy();
    shitPriceStore1.hasError = true;
    expect(store.hasError).toEqual(true);
  });

  it('let all input stores to start validate', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    const store0 = store.addStrategy();
    const store1 = store.addStrategy();
    store.startValidate();
    const shouldValidates = [
      store0.priceStore.shouldValidate,
      store1.priceStore.shouldValidate,
      store0.quantityStore.shouldValidate,
      store1.quantityStore.shouldValidate,
    ];
    expect(shouldValidates).toEqual([true, true, true, true]);
  });

  it('resets all stores', () => {
    const store = new StrategyStore({ shitPriceStore, currentPriceStore });
    store.addStrategy();
    store.reset();
    expect(store.strategyPlan.length).toEqual(1);
  });
});
