import * as React from 'react';
import { Box, Typography, IconButton, List, ListItem } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import type { ExposedInputProps } from '@ui/text-input/input';
import { ListControl } from '../list-control/list-control';
import { ReasonStore } from './reason-store';

type ReasonInputItemProps = WithTheme & {
  ReasonInput: React.ComponentType<ExposedInputProps>;
  idx: number;
  shouldShowRemove: boolean;
  onRemoveClick(idx: number): void;
};

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 0,
    marginLeft: theme.spacing(1),
  },
}));

const ReasonInputItem = React.memo(
  withTheme((props: ReasonInputItemProps) => {
    const onRemoveClick = React.useCallback(
      () => props.onRemoveClick(props.idx),
      [props.idx, props.onRemoveClick],
    );
    const styles = useStyles(props.theme);
    return (
      <ListItem dense disableGutters>
        <props.ReasonInput multiline={true} placeholder="可换行" />
        {props.shouldShowRemove && (
          <IconButton
            color="secondary"
            className={styles.iconButton}
            onClick={onRemoveClick}
            id={`remove-${props.idx}`}
          >
            <IndeterminateCheckBoxIcon />
          </IconButton>
        )}
      </ListItem>
    );
  }),
);

type ReasonSectionProps = {
  readonly ReasonsInput: React.ComponentType<ExposedInputProps>[];
  ListControlImpl: React.ComponentType;
  shouldShowRemove: boolean;
  onRemoveClick(idx: number): void;
};

export const ReasonSection = React.memo((props: ReasonSectionProps) => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="h4">
          持有逻辑(至少3条)
        </Typography>
        <Box ml="auto">
          <props.ListControlImpl />
        </Box>
      </Box>
      <List>
        {props.ReasonsInput.map((ReasonInput, idx) => (
          <ReasonInputItem
            ReasonInput={ReasonInput}
            shouldShowRemove={props.shouldShowRemove}
            onRemoveClick={props.onRemoveClick}
            key={idx}
            idx={idx}
          />
        ))}
      </List>
    </Box>
  );
});

export function createReasonSection(): [React.ComponentType, ReasonStore] {
  const store = new ReasonStore();
  store.addReason();
  store.addReason();
  store.addReason();
  const onAddClick = () => store.addReason();
  const onRemoveClick = (idx: number) => store.removeReason(idx);
  const onSwitchChange = (val: boolean) => store.setRemoveVisibility(val);
  const ListControlImpl = observer(() => (
    <ListControl
      removeChecked={store.shouldShowRemove}
      onRemoveChange={onSwitchChange}
      onAddClick={onAddClick}
    />
  ));

  const Component = observer(() => (
    <ReasonSection
      ReasonsInput={store.ReasonInputs}
      shouldShowRemove={store.shouldShowRemove}
      onRemoveClick={onRemoveClick}
      ListControlImpl={ListControlImpl}
    />
  ));
  return [Component, store];
}
