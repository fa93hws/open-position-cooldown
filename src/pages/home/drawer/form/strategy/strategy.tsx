import * as React from 'react';
import { Box, Typography } from '@material-ui/core';

import { ListControl } from '../list-control/list-control';

type ReasonSectionProps = {
  ListControlImpl: React.ComponentType;
};

export const Strategy = React.memo((props: ReasonSectionProps) => (
  <Box>
    <Box display="flex">
      <Typography variant="h6" component="h4">
        建仓策略
      </Typography>
      <Box ml="auto">
        <props.ListControlImpl />
      </Box>
    </Box>
  </Box>
));

export function createStrategyPanel() {
  const onAddClick = () => undefined;
  const onSwitchChange = () => undefined;
  const shouldShowRemove = false;

  const ListControlImpl = () => (
    <ListControl
      removeChecked={shouldShowRemove}
      onRemoveChange={onSwitchChange}
      onAddClick={onAddClick}
    />
  );
  return () => <Strategy ListControlImpl={ListControlImpl} />;
}
