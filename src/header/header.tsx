import * as React from 'react';
import { Heading, Flex, Link } from 'rebass';
import { Link as ReactRouterLink } from 'react-router-dom';

import { pagePath } from '../routes';
import { Home, About, IconType } from '../resources/icons';

const IconLink = (props: { Icon: IconType; to: string }) => (
  <Link
    size={['iconSmall', 'iconMedium']}
    p="0px"
    style={{ fill: 'white' }}
    as={ReactRouterLink}
    {...{ to: props.to }}
  >
    <props.Icon />
  </Link>
);

export const Header = () => (
  <Flex
    height={['50px', '70px']}
    px={[4, 5]}
    color="white"
    bg="primary"
    justifyContent="space-between"
    alignItems="center"
  >
    <IconLink Icon={Home} to={pagePath.home} />
    <Heading fontWeight="heading" fontSize={[2, 3]} variant="h1">
      买股冷静期
    </Heading>
    <IconLink Icon={About} to={pagePath.about} />
  </Flex>
);
