import * as React from 'react';
import { Box, Link } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { GitHub, Code } from '@material-ui/icons';

import { Weibo } from './icons';
import { sizes } from '../../../styles/styles';

const iconSize = {
  width: sizes[1],
  height: sizes[1],
};
const useFooterStyle = makeStyles((theme) => ({
  container: {
    height: sizes[2],
    backgroundColor: theme.palette.primary.main,
  },
  iconWrapper: {
    color: theme.palette.primary.contrastText,
    fill: theme.palette.primary.contrastText,
    ...iconSize,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
}));

export const Footer = withTheme((props: WithTheme) => {
  const styles = useFooterStyle(props.theme);
  return (
    <Box className={styles.container} display="flex" alignItems="center">
      <Box display="flex" justifyContent="space-around" flex="1">
        <Link
          href="https://github.com/fa93hws/"
          target="__blank"
          className={styles.iconWrapper}
        >
          {/* github icon is a bit larger than the others, add padding to reduce the size */}
          <GitHub className={styles.icon} style={{ padding: '4px' }} />
        </Link>
        <Link
          href="https://www.weibo.com/hinanawi/"
          target="__blank"
          className={styles.iconWrapper}
        >
          <Weibo />
        </Link>
        <Link
          href="https://github.com/fa93hws/open-position-cooldown"
          target="__blank"
          className={styles.iconWrapper}
        >
          <Code className={styles.icon} />
        </Link>
      </Box>
    </Box>
  );
});
