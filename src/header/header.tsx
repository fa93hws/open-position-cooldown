import * as React from 'react';
import { AppBar, Typography, Link } from '@material-ui/core';
import { Home, Info } from '@material-ui/icons';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { Link as ReactRouterLink } from 'react-router-dom';

import { sizes } from '@styles/styles';
import { pagePath } from '../routes';

const useHeaderStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: sizes[3],
    [theme.breakpoints.up('sm')]: {
      height: sizes[4],
    },
  },
  iconWrapper: {
    color: theme.palette.primary.contrastText,
  },
}));

export const Header = withTheme((props: WithTheme) => {
  const styles = useHeaderStyles(props.theme);
  return (
    <AppBar position="static" className={styles.container}>
      <Link
        className={styles.iconWrapper}
        component={ReactRouterLink}
        to={pagePath.home}
      >
        <Home fontSize="large" />
      </Link>
      <Typography variant="h4" component="h1">
        买股冷静期
      </Typography>
      <Link
        className={styles.iconWrapper}
        component={ReactRouterLink}
        to={pagePath.about}
      >
        <Info fontSize="large" />
      </Link>
    </AppBar>
  );
});
