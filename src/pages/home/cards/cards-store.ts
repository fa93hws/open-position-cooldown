import { makeObservable, observable, runInAction } from 'mobx';

import type {
  IntentionSchema,
  IntentionService,
} from '@services/intention/intention';

export class CardsStore {
  intentions: IntentionSchema[] = [];

  constructor(private readonly intentionService: IntentionService) {
    makeObservable(this, {
      intentions: observable.ref,
    });
  }

  async fetchIntentions() {
    const intentions = await this.intentionService.fetchIntentions();
    runInAction(() => {
      this.intentions = intentions;
    });
  }
}
