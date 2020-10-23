import { LocalStorageService } from '../local-storage';

describe('LocalStorage', () => {
  const getItem = jest.fn();
  const setItem = jest.fn();
  const localStorage = ({
    getItem,
    setItem,
  } as any) as typeof window.localStorage;

  beforeEach(() => {
    getItem.mockRestore();
    setItem.mockRestore();
  });

  it('creates a new array if there is no existing one', () => {
    const service = new LocalStorageService(localStorage);
    getItem.mockReturnValueOnce(null);
    service.addToArray('key', { val: 'val' });
    expect(getItem).toBeCalledWith('key');
    expect(setItem).toHaveBeenCalledWith('key', '[{"val":"val"}]');
  });

  it('push to existing array if there is an existing one', () => {
    const service = new LocalStorageService(localStorage);
    getItem.mockReturnValueOnce('[{"val":"val"}]');
    service.addToArray('key', { foo: 'bar' });
    expect(getItem).toBeCalledWith('key');
    expect(setItem).toHaveBeenCalledWith(
      'key',
      '[{"val":"val"},{"foo":"bar"}]',
    );
  });

  it('gets values based the key', async () => {
    const service = new LocalStorageService(localStorage);
    getItem.mockReturnValueOnce('[{"val":"val"}]');
    const response = await service.getItems('key');
    expect(getItem).toBeCalledWith('key');
    expect(response).toEqual([{ val: 'val' }]);
  });

  it('gets null if there is no value there', async () => {
    const service = new LocalStorageService(localStorage);
    getItem.mockReturnValueOnce(null);
    const response = await service.getItems('key');
    expect(getItem).toBeCalledWith('key');
    expect(response).toEqual(null);
  });
});
