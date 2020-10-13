import { makeObservable, observable, action } from 'mobx';

export class SheetStore {
  isRender = false;

  hasTransform = false;

  readonly animationTime = 300;

  constructor() {
    makeObservable(this, {
      isRender: observable.ref,
      hasTransform: observable.ref,
      toggleDisplay: action,
    });
  }

  toggleDisplay(value: boolean) {
    if (this.isRender && !value) {
      // open -> close
      this.hasTransform = false;
      setTimeout(
        action(() => {
          this.isRender = false;
        }),
        this.animationTime,
      );
    } else {
      this.isRender = value;
    }
  }

  onMount() {
    setTimeout(
      action(() => {
        this.hasTransform = this.isRender;
      }),
      50,
    );
  }
}
