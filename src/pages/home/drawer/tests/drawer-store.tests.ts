import { DrawerStore } from '../drawer-store';

describe('DrawerStore', () => {
  it('set open to false by default', () => {
    const store = new DrawerStore();
    expect(store.open).toEqual(false);
  });

  it('set open to value', () => {
    const store = new DrawerStore();
    store.setOpen(true);
    expect(store.open).toEqual(true);
  });
});
