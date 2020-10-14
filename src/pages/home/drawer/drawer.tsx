import * as React from 'react';
import { Drawer, Box, AppBar, Typography, IconButton } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { HighlightOff } from '@material-ui/icons';
import { observer } from 'mobx-react';

import { DrawerStore } from './drawer-store';
import { sizes } from '../../../styles/styles';

const useStyles = makeStyles((theme) => ({
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: sizes[3],
    [theme.breakpoints.up('sm')]: {
      height: sizes[4],
    },
  },
  iconWrapper: {
    color: theme.palette.primary.contrastText,
  },
  placeholderIconWrapper: {
    color: 'transparent',
    userSelect: 'none',
    cursor: 'default',
  },
}));

export const HomeDrawer = withTheme(
  (props: WithTheme & { open: boolean; onClose(): void }) => {
    const styles = useStyles();
    return (
      <Drawer anchor="bottom" open={props.open}>
        <Box height="100vh" width="100vw">
          <AppBar className={styles.headContainer} position="static">
            {/* placeholder to balance the layout */}
            <IconButton className={styles.placeholderIconWrapper}>
              <HighlightOff fontSize="large" />
            </IconButton>
            <Typography variant="h4" component="h1">
              真的要买？
            </Typography>
            <IconButton className={styles.iconWrapper} onClick={props.onClose}>
              <HighlightOff fontSize="large" />
            </IconButton>
          </AppBar>
        </Box>
      </Drawer>
    );
  },
);

export function createHomeDrawer() {
  const store = new DrawerStore();
  const handleClose = () => store.setOpen(false);
  const showDrawer = () => store.setOpen(true);
  const Component = observer(() => (
    <HomeDrawer open={store.open} onClose={handleClose} />
  ));
  return {
    Component,
    showDrawer,
  };
}
