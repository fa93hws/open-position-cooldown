import { InputStore } from '@ui/text-input/input-store';
import { LineStore } from '../line-store';

describe('LineStore', () => {
  it('get the price as number', () => {
    const priceStore = new InputStore([]);
    const quantityStore = new InputStore([]);
    const lineStore = new LineStore({ priceStore, quantityStore });
    priceStore.value = '2.1';
    expect(lineStore.price.toFixed(1)).toEqual('2.1');
  });

  it('get the quantity as number', () => {
    const priceStore = new InputStore([]);
    const quantityStore = new InputStore([]);
    const lineStore = new LineStore({ priceStore, quantityStore });
    quantityStore.value = '200';
    expect(lineStore.quantity).toEqual(200);
  });
});
