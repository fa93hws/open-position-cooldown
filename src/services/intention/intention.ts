import { LocalStorageService } from '@services/local-storage/local-storage';

export type IntentionSchema = {
  basicInfo: {
    name: string;
    code: string;
    market: string;
    // yyyy-MM-dd
    date: string;
  };
  // reason for holding the position
  reasons: string[];
  // why the current price is good
  priceExplain: string;
  strategy: {
    initial: {
      price: number;
      quantity: number;
    };
    plan: {
      price: number;
      quantity: number;
    }[];
    // say shit when droping to this price
    shitPrice: number;
  };
};

export class IntentionService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  async addIntention(intention: IntentionSchema) {
    this.localStorageService.addToArray('intentions', intention);
  }
}
