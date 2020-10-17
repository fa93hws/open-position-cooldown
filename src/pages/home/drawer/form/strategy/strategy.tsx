import * as React from 'react';
import { Box, Typography, List } from '@material-ui/core';
import { withTheme, WithTheme } from '@material-ui/core/styles';

import { createInput, ExposedInputProps } from '@ui/text-input/input';
import { nonEmpty, mustBeNumber } from '@ui/text-input/validator';
import { ListControl } from '../list-control/list-control';
import { createLine, useInputStyles } from './line/line';

type StrategySectionProps = WithTheme & {
  ListControlImpl: React.ComponentType;
  CurrentQuantityInput: React.ComponentType<ExposedInputProps>;
  ShitPriceInput: React.ComponentType<ExposedInputProps>;
  Lines: readonly React.ComponentType[];
};

export const Strategy = React.memo(
  withTheme((props: StrategySectionProps) => {
    const inputStyles = useInputStyles(props.theme);
    return (
      <Box>
        <Box display="flex">
          <Typography variant="h6" component="h4">
            建仓策略
          </Typography>
          <Box ml="auto">
            <props.ListControlImpl />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="body1" component="span">
            当前价格买入
          </Typography>
          <Box width={80} mx={1}>
            <props.ShitPriceInput inputClasses={inputStyles} />
          </Box>
          <Typography variant="body1" component="span">
            股
          </Typography>
        </Box>
        <List>
          {props.Lines.map((Line, idx) => (
            <Line key={idx} />
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" component="span">
            跌至
          </Typography>
          <Box width={100} mx={1}>
            <props.ShitPriceInput inputClasses={inputStyles} />
          </Box>
          <Typography variant="body1" component="span" color="secondary">
            妈的! 加不起！
          </Typography>
        </Box>
      </Box>
    );
  }),
);

export function createStrategyPanel() {
  const onAddClick = () => undefined;
  const onSwitchChange = () => undefined;
  const shouldShowRemove = false;

  const [Line] = createLine();

  const [CurrentQuantityInput] = createInput([nonEmpty, mustBeNumber]);
  const [ShitPriceInput] = createInput([nonEmpty, mustBeNumber]);

  const ListControlImpl = () => (
    <ListControl
      removeChecked={shouldShowRemove}
      onRemoveChange={onSwitchChange}
      onAddClick={onAddClick}
    />
  );
  return () => (
    <Strategy
      ListControlImpl={ListControlImpl}
      Lines={[Line]}
      CurrentQuantityInput={CurrentQuantityInput}
      ShitPriceInput={ShitPriceInput}
    />
  );
}
