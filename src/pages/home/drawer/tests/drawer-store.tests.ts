import { IntentionService } from '@services/intention/intention';
import { DrawerStore } from '../drawer-store';

describe('DrawerStore', () => {
  it('set open to false by default', () => {
    const service = new IntentionService();
    const store = new DrawerStore(service);
    expect(store.open).toEqual(false);
  });

  it('set open to value', () => {
    const service = new IntentionService();
    const store = new DrawerStore(service);
    store.setOpen(true);
    expect(store.open).toEqual(true);
  });

  it('close the modal after submitted', async () => {
    const service = new IntentionService();
    const addIntention = jest.fn().mockResolvedValue(undefined);
    service.addIntention = addIntention;
    const store = new DrawerStore(service);
    store.setOpen(true);
    const intention = {} as any;
    await store.submitIntention(intention);
    expect(addIntention).toBeCalledWith(intention);
    expect(store.open).toEqual(false);
  });
});
