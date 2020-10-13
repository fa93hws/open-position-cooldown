import * as React from 'react';
import { Box } from 'rebass';

import { AddButton } from './add-button/add-button';

export const HomePage = ({
  IconButton,
}: {
  IconButton: React.ComponentType;
}) => (
  <Box height="100%" sx={{ position: 'relative' }}>
    <IconButton />
  </Box>
);

export function createHomePage() {
  return () => <HomePage IconButton={AddButton} />;
}
