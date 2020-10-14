import * as React from 'react';
import { Box } from 'rebass';

import { AddButton } from './add-button/add-button';
// import { createSheet } from './sheet/sheet';
import { createHomeDrawer } from './drawer/drawer';

export const HomePage = ({
  IconButton,
  Sheet,
}: {
  IconButton: React.ComponentType;
  Sheet: React.ComponentType;
}) => (
  <Box height="100%" sx={{ position: 'relative' }}>
    <IconButton />
    <Sheet />
  </Box>
);

export function createHomePage() {
  const { Component, showDrawer } = createHomeDrawer();
  const AddButtonImpl = () => <AddButton onClick={showDrawer} />;
  return () => <HomePage IconButton={AddButtonImpl} Sheet={Component} />;
}
