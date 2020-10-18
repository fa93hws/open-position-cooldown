import { makeObservable, observable, action } from 'mobx';

export class DatePickerStore {
  date: Date;

  asDateString() {
    let month = `${this.date.getMonth() + 1}`;
    let day = `${this.date.getDate()}`;
    const year = this.date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  constructor(date = new Date()) {
    this.date = date;
    makeObservable(this, {
      date: observable.ref,
      setDate: action,
    });
  }

  setDate(val: Date | null) {
    if (val == null) {
      return;
    }
    this.date = val;
  }

  reset() {
    this.setDate(new Date());
  }
}
