import * as React from 'react';
import { Drawer, Box, AppBar, Typography, IconButton } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { HighlightOff } from '@material-ui/icons';
import { observer } from 'mobx-react';

import type { IntentionService } from '@services/intention/intention';
import { sizes } from '@styles/styles';
import { createForm } from './form/form';
import { DrawerStore } from './drawer-store';

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

type HomeDrawerProps = WithTheme & {
  open: boolean;
  onClose(): void;
  Form: React.ComponentType;
};

export const HomeDrawer = React.memo(
  withTheme((props: HomeDrawerProps) => {
    const styles = useStyles();
    return (
      <Drawer anchor="bottom" open={props.open}>
        <Box height="100vh" width="100%" display="flex" flexDirection="column">
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
          <Box flex={1}>
            <props.Form />
          </Box>
        </Box>
      </Drawer>
    );
  }),
);

export function createHomeDrawer(
  intentionService: IntentionService,
  afterSubmit: () => void,
) {
  const store = new DrawerStore(intentionService, afterSubmit);
  const handleClose = () => store.setOpen(false);
  const showDrawer = () => store.setOpen(true);

  const Form = createForm(store.submitIntention);
  const Component = observer(() => (
    <HomeDrawer open={store.open} onClose={handleClose} Form={Form} />
  ));
  return {
    Component,
    showDrawer,
  };
}
