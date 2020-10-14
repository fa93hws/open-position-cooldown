import { makeObservable, observable, action } from 'mobx';

export class DrawerStore {
  open = false;

  constructor() {
    makeObservable(this, {
      open: observable.ref,
      setOpen: action,
    });
  }

  setOpen(value: boolean) {
    this.open = value;
  }
}
