export type IntentionSchema = {
  basicInfo: {
    name: string;
    code: string;
    market: string;
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
  async addIntention(intention: IntentionSchema) {
    console.log(intention); // eslint-disable-line
  }
}
