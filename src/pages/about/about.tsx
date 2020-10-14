import * as React from 'react';
import { Heading, Box, Text } from 'rebass';

import { Footer } from './footer/footer';

export const AboutPage = () => (
  <Box p={[4, 5]} as="article">
    <Heading fontWeight="heading" fontSize={[4, 5]} variant="h1">
      APP的目的:
    </Heading>
    <Text fontSize={[2, 3]} mt={[1, 2]} as="p">
      离婚居然要冷静期，买股票居然不用？真是不可思议。
    </Text>
    <Text fontSize={[2, 3]} mt={[1, 2]} as="p">
      买股票前先想想好吧，不猜涨跌，只应对。
    </Text>
    <Footer />
  </Box>
);
