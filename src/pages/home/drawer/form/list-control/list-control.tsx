import * as React from 'react';
import { Switch, IconButton } from '@material-ui/core';
import { AddBox, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

type ListControlProps = {
  removeChecked: boolean;
  onRemoveChange(val: boolean): void;
  onAddClick(): void;
};

const useSwitchStyles = makeStyles({
  sizeSmall: {
    '& $switchBase': {
      padding: 0,
    },
  },
  switchBase: {},
});

const useIconButtonStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export const ListControl = React.memo((props: ListControlProps) => {
  const switchStyles = useSwitchStyles();
  const iconButtonStyles = useIconButtonStyles();
  const UncheckIcon = <Delete color="secondary" />;
  const CheckedIcon = <Delete />;
  const onRemoveChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    props.onRemoveChange(ev.target.checked);
  };
  return (
    <>
      <Switch
        id="switch"
        size="small"
        color="primary"
        checked={props.removeChecked}
        checkedIcon={CheckedIcon}
        icon={UncheckIcon}
        classes={switchStyles}
        onChange={onRemoveChange}
      />
      <IconButton
        id="add-reason"
        color="primary"
        classes={iconButtonStyles}
        onClick={props.onAddClick}
      >
        <AddBox />
      </IconButton>
    </>
  );
});
