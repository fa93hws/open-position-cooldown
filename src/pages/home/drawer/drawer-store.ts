import type {
  IntentionSchema,
  IntentionService,
} from '@services/intention/intention';
import { makeObservable, observable, action } from 'mobx';

export class DrawerStore {
  open = false;

  constructor(
    private intentionService: IntentionService,
    private afterSubmit: () => void,
  ) {
    makeObservable(this, {
      open: observable.ref,
      setOpen: action,
    });
  }

  setOpen(value: boolean) {
    this.open = value;
  }

  submitIntention = async (intention: IntentionSchema) => {
    await this.intentionService.addIntention(intention);
    this.setOpen(false);
    this.afterSubmit();
  };
}
