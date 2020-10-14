import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Footer } from './footer/footer';

export const AboutPage = () => (
  <Box display="flex" flexDirection="column" height="100%">
    <Box flex="1" component="article" padding={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        APP的目的:
      </Typography>
      <Typography variant="body1" gutterBottom>
        离婚居然要冷静期，买股票居然不用？真是不可思议。
      </Typography>
      <Typography variant="body1">
        买股票前先想想好吧，不猜涨跌，只应对。
      </Typography>
    </Box>
    <Footer />
  </Box>
);
