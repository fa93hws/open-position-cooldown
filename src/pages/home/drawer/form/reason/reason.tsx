import * as React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Switch,
  List,
  ListItem,
} from '@material-ui/core';
import { AddBox, Delete } from '@material-ui/icons';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import type { ExposedInputProps } from '../input/input';
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
  reasonList: {
    padding: 0,
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

type ReasonSectionProps = WithTheme & {
  readonly ReasonsInput: React.ComponentType<ExposedInputProps>[];
  onAddClick(): void;
  shouldShowRemove: boolean;
  onSwitchChange(val: boolean): void;
  onRemoveClick(idx: number): void;
};

const useSwitchStyles = makeStyles({
  sizeSmall: {
    '& $switchBase': {
      padding: 0,
    },
  },
  root: {
    marginLeft: 'auto',
  },
  switchBase: {},
});

export const ReasonSection = React.memo(
  withTheme((props: ReasonSectionProps) => {
    const styles = useStyles(props.theme);
    const switchStyles = useSwitchStyles();
    const UncheckIcon = <Delete color="secondary" />;
    const CheckedIcon = <Delete />;
    const onSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      props.onSwitchChange(ev.target.checked);
    };
    return (
      <Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h4">
            持有逻辑(至少3条)
          </Typography>
          <Switch
            id="switch"
            size="small"
            color="primary"
            checked={props.shouldShowRemove}
            checkedIcon={CheckedIcon}
            icon={UncheckIcon}
            classes={switchStyles}
            onChange={onSwitchChange}
          />
          <IconButton
            id="add-reason"
            color="primary"
            className={styles.iconButton}
            onClick={props.onAddClick}
          >
            <AddBox />
          </IconButton>
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
  }),
);

export function createReasonSection(): [React.ComponentType, ReasonStore] {
  const store = new ReasonStore();
  store.addReason();
  store.addReason();
  store.addReason();
  const onAddClick = () => store.addReason();
  const onRemoveClick = (idx: number) => store.removeReason(idx);
  const onSwitchChange = (val: boolean) => store.setRemoveVisibility(val);

  const Component = observer(() => (
    <ReasonSection
      ReasonsInput={store.ReasonInputs}
      onAddClick={onAddClick}
      shouldShowRemove={store.shouldShowRemove}
      onSwitchChange={onSwitchChange}
      onRemoveClick={onRemoveClick}
    />
  ));
  return [Component, store];
}
