import * as React from 'react';
import { Box } from '@material-ui/core';
import { withTheme, WithTheme } from '@material-ui/core/styles';

import { IntentionService } from '@services/intention/intention';
import { AddButton } from './add-button/add-button';
import { createHomeDrawer } from './drawer/drawer';

export const HomePage = withTheme(
  ({
    IconButton,
    Sheet,
  }: WithTheme & {
    IconButton: React.ComponentType;
    Sheet: React.ComponentType;
  }) => (
    <Box height="100%" position="relative">
      <Box position="absolute" bottom={16} right={16}>
        <IconButton />
      </Box>
      <Sheet />
    </Box>
  ),
);

export function createHomePage() {
  const intentionService = new IntentionService();
  const { Component, showDrawer } = createHomeDrawer(intentionService);
  const AddButtonImpl = () => <AddButton onClick={showDrawer} />;
  return () => <HomePage IconButton={AddButtonImpl} Sheet={Component} />;
}
