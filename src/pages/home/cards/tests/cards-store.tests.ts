import { IntentionService } from '@services/intention/intention';
import { CardsStore } from '../cards-store';

describe('CardsStore', () => {
  it('sets intentions to empty array when initialized', () => {
    const store = new CardsStore({} as any);
    expect(store.intentions).toEqual([]);
  });

  it('fetchs the intentions from the intentionService and set to value', async () => {
    const intentionService = new IntentionService({} as any);
    jest.spyOn(intentionService, 'fetchIntentions').mockResolvedValueOnce([
      {
        value: '1',
      } as any,
    ]);
    const store = new CardsStore(intentionService);
    await store.fetchIntentions();
    expect(store.intentions).toEqual([{ value: '1' }]);
  });
});
