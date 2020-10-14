import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import { observer } from 'mobx-react';

import { DrawerStore } from './drawer-store';

export const HomeDrawer = (props: { open: boolean }) => {
  return (
    <Drawer anchor="bottom" open={props.open}>
      <Box height="100vh" width="100vw">
        123
      </Box>
    </Drawer>
  );
};

export function createHomeDrawer() {
  const store = new DrawerStore();
  const Component = observer(() => <HomeDrawer open={store.open} />);
  const showDrawer = () => store.setOpen(true);
  return {
    Component,
    showDrawer,
  };
}
