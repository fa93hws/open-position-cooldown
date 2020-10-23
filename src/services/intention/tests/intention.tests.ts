import { IntentionService } from '../intention';
import { LocalStorageService } from '../../local-storage/local-storage';

describe('Intention', () => {
  it('write the value to local storage', async () => {
    const addToArray = jest.fn();
    const localStorageService = new LocalStorageService();
    jest
      .spyOn(localStorageService, 'addToArray')
      .mockImplementationOnce(addToArray);
    const service = new IntentionService(localStorageService);
    await service.addIntention({ a: 'foo' } as any);
    expect(addToArray).toHaveBeenCalledWith('intentions', { a: 'foo' });
  });

  it('fetchs the value from the local storage', async () => {
    const localStorageService = new LocalStorageService();
    jest.spyOn(localStorageService, 'getItems').mockResolvedValueOnce([
      {
        value: '1',
      },
    ]);
    const service = new IntentionService(localStorageService);
    const val = await service.fetchIntentions();
    expect(val).toEqual([{ value: '1' }]);
  });
});
