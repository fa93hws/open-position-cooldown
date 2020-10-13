import { SheetStore } from '../sheet-store';

jest.useFakeTimers();

describe('SheetStore', () => {
  it('default is false to both render and transform', () => {
    const store = new SheetStore();
    expect(store.isRender).toEqual(false);
    expect(store.hasTransform).toEqual(false);
  });

  it('transform will set to true after a while when onmount is called and it should be rendered', () => {
    const store = new SheetStore();
    store.isRender = true;
    store.onMount();
    expect(store.hasTransform).toEqual(false);
    jest.advanceTimersByTime(100);
    expect(store.hasTransform).toEqual(true);
  });

  it('transform will not set to true after a while when onmount is called but it should not be rendered', () => {
    const store = new SheetStore();
    store.isRender = false;
    store.onMount();
    expect(store.hasTransform).toEqual(false);
    jest.advanceTimersByTime(100);
    expect(store.hasTransform).toEqual(false);
  });

  it('when closed, transform will be set to false first, then isRender after animation time', () => {
    const store = new SheetStore();
    store.isRender = true;
    store.hasTransform = true;
    store.toggleDisplay(false);

    expect(store.hasTransform).toEqual(false);
    jest.advanceTimersByTime(store.animationTime - 1);
    expect(store.isRender).toEqual(true);
    jest.advanceTimersByTime(2);
    expect(store.isRender).toEqual(false);
  });
});
