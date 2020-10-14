import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { GitHub, Code } from '@material-ui/icons';

import { Weibo } from '../../../resources/icons';
import { sizes } from '../../../styles/styles';

const iconSize = {
  width: sizes[1],
  height: sizes[1],
};
const useFooterStyle = makeStyles((theme) => ({
  container: {
    height: sizes[2],
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon: {
    color: theme.palette.primary.contrastText,
    ...iconSize,
  },
  customIconWrapper: {
    fill: theme.palette.primary.contrastText,
    ...iconSize,
  },
}));

export const Footer = withTheme((props: WithTheme) => {
  const styles = useFooterStyle(props.theme);
  return (
    <Box className={styles.container}>
      <Container className={styles.linksContainer}>
        <Link href="https://github.com/fa93hws/" target="__blank">
          {/* github icon is a bit larger than the others, add padding to reduce the size */}
          <GitHub className={styles.icon} style={{ padding: '4px' }} />
        </Link>
        <Link href="https://www.weibo.com/hinanawi/" target="__blank">
          <Box className={styles.customIconWrapper}>
            <Weibo />
          </Box>
        </Link>
        <Link
          href="https://github.com/fa93hws/open-position-cooldown"
          target="__blank"
        >
          <Code className={styles.icon} />
        </Link>
      </Container>
    </Box>
  );
});
