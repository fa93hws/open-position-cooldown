import { DatePickerStore } from '../date-picker-store';

describe('DatePickerStore', () => {
  const todayDateStr = new DatePickerStore(new Date()).asDateString();
  it('format date to yyyy-MM-dd', () => {
    const store = new DatePickerStore(new Date('1999-02-04'));
    expect(store.asDateString()).toEqual('1999-02-04');
  });

  it('use today date by default', () => {
    const store = new DatePickerStore();
    expect(store.asDateString()).toEqual(todayDateStr);
  });

  it('sets date to value', () => {
    const store = new DatePickerStore();
    const d = new Date('1999-02-04');
    store.setDate(d);
    expect(store.date).toEqual(d);
  });

  it('will not sets date to value if it isnull', () => {
    const d = new Date('1999-02-04');
    const store = new DatePickerStore(d);
    store.setDate(null);
    expect(store.date).toEqual(d);
  });

  it('sets date to today when reseted', () => {
    const store = new DatePickerStore(new Date('1999-02-04'));
    store.reset();
    expect(store.asDateString()).toEqual(todayDateStr);
  });
});
