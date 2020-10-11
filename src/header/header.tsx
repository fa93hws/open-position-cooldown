import * as React from 'react';
import { Heading, Box, Flex } from 'rebass';

export const Header = () => (
  <Box height={[50, 70]} color="white" bg="primary">
    <Flex
      paddingTop={[2, 3]}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Heading fontWeight="heading" fontSize={[2, 3]} variant="h1">
        买股冷静期
      </Heading>
      <Heading fontWeight="heading" fontSize={[0, 1]} variant="h4">
        离婚居然要冷静期，买股票居然不用？真是不可思议
      </Heading>
    </Flex>
  </Box>
);
