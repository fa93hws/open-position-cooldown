import * as React from 'react';
import { Box } from 'rebass';

import { AddButton } from './add-button/add-button';

export const HomePage = () => (
  <Box height="100%" sx={{ position: 'relative' }}>
    <AddButton />
  </Box>
);
