import type { IntentionSchema } from '@services/intention/intention';
import type { InputStore } from '@ui/text-input/input-store';
import { UnreachableException } from '@utils/unreachable-exception';
import type { BasicInfoStore } from './basic-info/basic-info-store';
import type { ReasonStore } from './reason/reason-store';
import type { StrategyStore } from './strategy/strategy-store';

const enum ValidateResult {
  BASIC_INFO_ERROR,
  PRICE_EXPLAIN_ERROR,
  REASON_ERROR,
  STRATEGY_ERROR,
  NO_ERROR,
}

export class FormStore {
  constructor(
    readonly basicInfoStore: BasicInfoStore,
    readonly reasonStore: ReasonStore,
    readonly priceExplainStore: InputStore,
    readonly strategyStore: StrategyStore,
    private readonly submitIntention: (
      intention: IntentionSchema,
    ) => Promise<void>,
  ) {}

  private validate(): ValidateResult {
    this.basicInfoStore.startValidate();
    this.reasonStore.startValidate();
    this.priceExplainStore.startValidate();
    this.strategyStore.startValidate();
    if (this.basicInfoStore.hasError) {
      return ValidateResult.BASIC_INFO_ERROR;
    }
    if (this.reasonStore.reasonErrors.includes(true)) {
      return ValidateResult.REASON_ERROR;
    }
    if (this.priceExplainStore.hasError) {
      return ValidateResult.PRICE_EXPLAIN_ERROR;
    }
    if (this.strategyStore.strategyErrors.includes(true)) {
      return ValidateResult.STRATEGY_ERROR;
    }
    return ValidateResult.NO_ERROR;
  }

  private toIntention(): IntentionSchema {
    return {
      basicInfo: {
        name: this.basicInfoStore.name,
        code: this.basicInfoStore.code,
        market: this.basicInfoStore.market,
      },
      reasons: this.reasonStore.reasonStrings,
      priceExplain: this.priceExplainStore.value,
      strategy: {
        initial: {
          quantity: this.strategyStore.initialQuantity,
          price: this.basicInfoStore.priceAsNum,
        },
        plan: this.strategyStore.strategyPlan,
        shitPrice: this.strategyStore.shitPrice,
      },
    };
  }

  async submit(alert: (msg: string) => void = window.alert) {
    const result = this.validate();
    switch (result) {
      case ValidateResult.NO_ERROR:
        await this.submitIntention(this.toIntention());
        return alert('submitted!'); // eslint-disable-line
      case ValidateResult.BASIC_INFO_ERROR:
        return alert('基本信息错误'); // eslint-disable-line
      case ValidateResult.REASON_ERROR:
        return alert('持有理由错误'); // eslint-disable-line
      case ValidateResult.PRICE_EXPLAIN_ERROR:
        return alert('价格解释错误'); // eslint-disable-line
      case ValidateResult.STRATEGY_ERROR:
        return alert('建仓策略错误'); // eslint-disable-line
      default:
        throw new UnreachableException(result);
    }
  }
}
