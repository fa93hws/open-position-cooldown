import * as React from 'react';
import { Heading, Flex, Box, Text } from 'rebass';

export const AboutPage = () => (
  <Flex>
    <Box>
      <Heading fontWeight="heading" fontSize={[4, 5]} variant="h1">
        APP的目的:
      </Heading>
      <Text fontSize={[2, 3]} mt={[1, 2]}>
        离婚居然要冷静期，买股票居然不用？真是不可思议。
        <br />
        买股票前先想想好吧，不猜涨跌，只应对。
      </Text>
    </Box>
  </Flex>
);
