import * as React from 'react';
import { Box } from '@material-ui/core';
import { withTheme, WithTheme } from '@material-ui/core/styles';

import { IntentionService } from '@services/intention/intention';
import { LocalStorageService } from '@services/local-storage/local-storage';
import { createCards } from './cards/cards';
import { AddButton } from './add-button/add-button';
import { createHomeDrawer } from './drawer/drawer';

type HomePageProps = WithTheme & {
  IconButton: React.ComponentType;
  Cards: React.ComponentType;
  Sheet: React.ComponentType;
  onMount(): void;
};
export const HomePage = React.memo(
  withTheme((props: HomePageProps) => {
    React.useEffect(() => {
      props.onMount();
    }, []);
    return (
      <Box height="100%" position="relative">
        <props.Cards />
        <Box position="absolute" bottom={16} right={16}>
          <props.IconButton />
        </Box>
        <props.Sheet />
      </Box>
    );
  }),
);

export function createHomePage() {
  const localStorageService = new LocalStorageService();
  const intentionService = new IntentionService(localStorageService);
  const [Cards, cardsStore] = createCards(intentionService);

  const afterSubmit = () => cardsStore.fetchIntentions();
  const { Component, showDrawer } = createHomeDrawer(
    intentionService,
    afterSubmit,
  );

  const AddButtonImpl = () => <AddButton onClick={showDrawer} />;

  const onMount = () => cardsStore.fetchIntentions();

  return () => (
    <HomePage
      IconButton={AddButtonImpl}
      Sheet={Component}
      Cards={Cards}
      onMount={onMount}
    />
  );
}
