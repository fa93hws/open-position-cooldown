import * as React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography, List, ListItem, IconButton } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

import { createInput, ExposedInputProps } from '@ui/text-input/input';
import { nonEmpty, mustBeNumber } from '@ui/text-input/validator';
import { ListControl } from '../list-control/list-control';
import { useInputStyles } from './line/line';
import { StrategyStore } from './strategy-store';

type LineItemProps = WithTheme & {
  Line: React.ComponentType;
  shouldShowRemove: boolean;
  idx: number;
  onRemoveClick(idx: number): void;
};

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 0,
    marginLeft: theme.spacing(1),
  },
}));

const LineItem = React.memo(
  withTheme((props: LineItemProps) => {
    const styles = useStyles(props.theme);
    const onRemoveClick = React.useCallback(
      () => props.onRemoveClick(props.idx),
      [props.idx, props.onRemoveClick],
    );
    return (
      <ListItem alignItems="center" dense disableGutters>
        <props.Line />
        {props.shouldShowRemove && (
          <IconButton
            color="secondary"
            className={styles.iconButton}
            onClick={onRemoveClick}
            title="remove"
          >
            <IndeterminateCheckBoxIcon />
          </IconButton>
        )}
      </ListItem>
    );
  }),
);

type StrategySectionProps = WithTheme & {
  ListControlImpl: React.ComponentType;
  CurrentQuantityInput: React.ComponentType<ExposedInputProps>;
  ShitPriceInput: React.ComponentType<ExposedInputProps>;
  Lines: readonly React.ComponentType[];
  shouldShowRemove: boolean;
  onRemoveClick(idx: number): void;
};

export const Strategy = React.memo(
  withTheme((props: StrategySectionProps) => {
    const inputStyles = useInputStyles(props.theme);
    return (
      <Box>
        <Box display="flex">
          <Typography variant="h6" component="h4">
            之后暴跌怎么办
          </Typography>
          <Box ml="auto">
            <props.ListControlImpl />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" my={1}>
          <Typography variant="body1" component="span">
            当前价格买入
          </Typography>
          <Box width={80} mx={1}>
            <props.CurrentQuantityInput inputClasses={inputStyles} />
          </Box>
          <Typography variant="body1" component="span">
            股
          </Typography>
        </Box>
        <List dense disablePadding>
          {props.Lines.map((Line, idx) => (
            <LineItem
              key={idx}
              idx={idx}
              Line={Line}
              shouldShowRemove={props.shouldShowRemove}
              onRemoveClick={props.onRemoveClick}
            />
          ))}
        </List>
        <Box display="flex" alignItems="center" my={1}>
          <Typography variant="body1" component="span">
            跌至
          </Typography>
          <Box width={100} mx={1}>
            <props.ShitPriceInput inputClasses={inputStyles} />
          </Box>
          <Typography variant="body1" component="span">
            以下时:&nbsp;&nbsp;
          </Typography>
          <Typography variant="body1" component="span" color="secondary">
            没辙了
          </Typography>
        </Box>
      </Box>
    );
  }),
);

export function createStrategyPanel(): [React.ComponentType, StrategyStore] {
  const [CurrentQuantityInput, currentPriceStore] = createInput([
    nonEmpty,
    mustBeNumber,
  ]);
  const [ShitPriceInput, shitPriceStore] = createInput([
    nonEmpty,
    mustBeNumber,
  ]);
  const store = new StrategyStore({ currentPriceStore, shitPriceStore });
  store.reset();
  const onAddClick = () => store.addStrategy();
  const onSwitchChange = (val: boolean) => store.setRemoveVisibility(val);

  const ListControlImpl = observer(() => (
    <ListControl
      removeChecked={store.shouldShowRemove}
      onRemoveChange={onSwitchChange}
      onAddClick={onAddClick}
    />
  ));
  const onRemoveClick = (idx: number) => store.removeStrategy(idx);

  const Component = observer(() => (
    <Strategy
      ListControlImpl={ListControlImpl}
      Lines={store.StrategyLines}
      CurrentQuantityInput={CurrentQuantityInput}
      ShitPriceInput={ShitPriceInput}
      shouldShowRemove={store.shouldShowRemove}
      onRemoveClick={onRemoveClick}
    />
  ));
  return [Component, store];
}
