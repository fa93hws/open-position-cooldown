import * as React from 'react';
import { Button } from 'rebass';
import { Plus } from '../../../resources/icons';

export const AddButton = (props: { onClick: () => void }) => (
  <Button
    p={2}
    mr={[3, 4]}
    mb={[3, 4]}
    variant="primaryIcon"
    fontSize="0px"
    size="iconMedium"
    sx={{
      position: 'absolute',
      fill: 'white',
      bottom: 0,
      right: 0,
    }}
    onClick={props.onClick}
  >
    <Plus />
  </Button>
);
