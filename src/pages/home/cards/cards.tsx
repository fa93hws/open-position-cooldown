import * as React from 'react';
import { Box } from '@material-ui/core';
import { observer } from 'mobx-react';

import type {
  IntentionSchema,
  IntentionService,
} from '@services/intention/intention';
import { CardsStore } from './cards-store';

type CardsProps = {
  intentions: IntentionSchema[];
};
export const Cards = React.memo((props: CardsProps) => (
  <Box>{props.intentions.length}</Box>
));

export function createCards(
  intentionService: IntentionService,
): [React.ComponentType, CardsStore] {
  const store = new CardsStore(intentionService);
  const Component = observer(() => <Cards intentions={store.intentions} />);
  return [Component, store];
}
