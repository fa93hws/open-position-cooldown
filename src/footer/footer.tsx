import * as React from 'react';
import { Flex, Link } from 'rebass';
import { Github, Weibo, Code, IconType } from '../resources/icons';

const IconLink = (props: { Icon: IconType; href: string }) => (
  <Link
    size={['iconSmall', 'iconMedium']}
    p="0px"
    href={props.href}
    target="__blank"
    sx={{ fill: 'white' }}
  >
    <props.Icon />
  </Link>
);

export const Footer = () => (
  <Flex
    height={['50px', '70px']}
    bg="primary"
    justifyContent="space-around"
    alignItems="center"
    fontSize="0px"
    as="footer"
  >
    <IconLink Icon={Weibo} href="https://weibo.com/hinanawi" />
    <IconLink Icon={Github} href="https://github.com/fa93hws/" />
    <IconLink
      Icon={Code}
      href="https://github.com/fa93hws/open-position-cooldown"
    />
  </Flex>
);
