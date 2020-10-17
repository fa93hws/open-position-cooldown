import { IntentionSchema } from '@services/intention/intention';
import { InputStore } from '@ui/text-input/input-store';
import { BasicInfoStore } from '../basic-info/basic-info-store';
import { FormStore } from '../form-store';
import { ReasonStore } from '../reason/reason-store';
import { StrategyStore } from '../strategy/strategy-store';

describe('FormStore', () => {
  function createStores(submit: (val: IntentionSchema) => Promise<void>) {
    const validator = (val: string) => val !== 'error';
    const nameStore = new InputStore([validator]);
    const priceStore = new InputStore([validator]);
    const marketStore = new InputStore([validator]);
    const codeStore = new InputStore([validator]);
    const basicInfo = new BasicInfoStore({
      nameStore,
      priceStore,
      marketStore,
      codeStore,
    });
    const reasonStore = new ReasonStore();
    const reason1 = reasonStore.addReason();
    const reason2 = reasonStore.addReason();
    const priceExplainStore = new InputStore([validator]);
    const shitPriceStore = new InputStore([validator]);
    const currentPriceStore = new InputStore([validator]);
    const strategyStore = new StrategyStore({
      shitPriceStore,
      currentPriceStore,
    });
    const strategy1 = strategyStore.addStrategy();
    const strategy2 = strategyStore.addStrategy();
    const formStore = new FormStore(
      basicInfo,
      reasonStore,
      priceExplainStore,
      strategyStore,
      submit,
    );
    nameStore.setValue('name');
    codeStore.setValue('code');
    marketStore.setValue('market');
    priceStore.setValue('15');
    reason1.setValue('reason1');
    reason2.setValue('reason2');
    priceExplainStore.setValue('priceExplain');
    currentPriceStore.setValue('300');
    strategy1.priceStore.setValue('13');
    strategy1.quantityStore.setValue('100');
    strategy2.priceStore.setValue('14');
    strategy2.quantityStore.setValue('200');
    shitPriceStore.setValue('12');
    return {
      nameStore,
      priceStore,
      marketStore,
      codeStore,
      basicInfo,
      reasonStore,
      reason1,
      reason2,
      priceExplainStore,
      shitPriceStore,
      currentPriceStore,
      strategy1,
      strategy2,
      strategyStore,
      formStore,
    };
  }
  const submitIntention = jest.fn();
  const alert = jest.fn();

  beforeEach(() => {
    submitIntention.mockClear();
    alert.mockClear();
  });

  it('submit without error', async () => {
    const { formStore } = createStores(submitIntention);

    await formStore.submit(jest.fn());
    expect(submitIntention).toHaveBeenCalledWith({
      basicInfo: {
        name: 'name',
        code: 'code',
        market: 'market',
      },
      reasons: ['reason1', 'reason2'],
      priceExplain: 'priceExplain',
      strategy: {
        initial: { price: 15, quantity: 300 },
        plan: [
          { price: 13, quantity: 100 },
          { price: 14, quantity: 200 },
        ],
        shitPrice: 12,
      },
    });
  });

  it('alerts strategy error', async () => {
    const { strategy1, formStore } = createStores(submitIntention);
    strategy1.quantityStore.setValue('error');
    await formStore.submit(alert);
    expect(submitIntention).not.toBeCalled();
    expect(alert).toHaveBeenCalledWith('建仓策略错误');
  });

  it('will not reset if not submit', async () => {
    const { strategy1, formStore } = createStores(submitIntention);
    strategy1.quantityStore.setValue('error');
    await formStore.submit(jest.fn());
    expect(strategy1.quantityStore.value).toEqual('error');
  });

  it('alerts price error', async () => {
    const { strategy1, priceExplainStore, formStore } = createStores(
      submitIntention,
    );
    strategy1.quantityStore.setValue('error');
    priceExplainStore.setValue('error');
    await formStore.submit(alert);
    expect(submitIntention).not.toBeCalled();
    expect(alert).toHaveBeenCalledWith('价格解释错误');
  });

  it('alerts reason exp error', async () => {
    const { strategy1, priceExplainStore, reason1, formStore } = createStores(
      submitIntention,
    );
    reason1.setValue('');
    strategy1.quantityStore.setValue('error');
    priceExplainStore.setValue('error');
    await formStore.submit(alert);
    expect(submitIntention).not.toBeCalled();
    expect(alert).toHaveBeenCalledWith('持有理由错误');
  });

  it('alerts basic info error', async () => {
    const {
      strategy1,
      priceExplainStore,
      reason1,
      nameStore,
      formStore,
    } = createStores(submitIntention);
    nameStore.setValue('error');
    reason1.setValue('error');
    strategy1.quantityStore.setValue('error');
    priceExplainStore.setValue('error');
    await formStore.submit(alert);
    expect(submitIntention).not.toBeCalled();
    expect(alert).toHaveBeenCalledWith('基本信息错误');
  });

  it('resets the form after submit', async () => {
    const {
      basicInfo,
      reasonStore,
      priceExplainStore,
      strategyStore,
      formStore,
    } = createStores(submitIntention);
    await formStore.submit(alert);
    expect(submitIntention).toBeCalled();
    expect(basicInfo.name).toEqual('');
    expect(reasonStore.reasonStrings).toEqual(['', '', '']);
    expect(priceExplainStore.value).toEqual('');
    expect(strategyStore.strategies.length).toEqual(1);
  });
});
