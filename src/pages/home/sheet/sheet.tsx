import * as React from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';
import { Box, Button } from 'rebass';

import { Plus } from '../../../resources/icons';
import { SheetStore } from './sheet-store';

export const Sheet = (props: {
  onMount: () => void;
  onClose: () => void;
  hasTransform: boolean;
  animationTime: number;
}) => {
  const sx = {
    position: 'absolute',
    transition: `transform ${props.animationTime}ms`,
    transform: 'none',
  };
  if (props.hasTransform) {
    sx.transform = 'translateY(-100%)';
  }
  React.useEffect(() => props.onMount(), []);
  return (
    <Box height="100vh" width="100vw" backgroundColor="white" sx={sx}>
      <Button
        variant="primaryIcon"
        size={['iconSmall', 'iconMedium']}
        sx={{ fill: 'white', transform: 'rotate(45deg)' }}
        p={1}
        onClick={props.onClose}
      >
        <Plus />
      </Button>
    </Box>
  );
};

export function createSheet(): {
  Component: React.ComponentType;
  open(): void;
} {
  const sheetContainer = document.createElement('div');
  document.body.appendChild(sheetContainer);

  const sheetStore = new SheetStore();

  const Component = observer(() => {
    const onMount = () => sheetStore.onMount();
    const onClose = () => sheetStore.toggleDisplay(false);
    return createPortal(
      sheetStore.isRender && (
        <Sheet
          onMount={onMount}
          onClose={onClose}
          hasTransform={sheetStore.hasTransform}
          animationTime={sheetStore.animationTime}
        />
      ),
      sheetContainer,
    );
  });

  return {
    Component,
    open: () => sheetStore.toggleDisplay(true),
  };
}
