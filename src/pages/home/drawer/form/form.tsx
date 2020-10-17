import * as React from 'react';
import { Button, Box, Divider } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';

import { designWidth } from '@styles/styles';
import type { IntentionSchema } from '@services/intention/intention';
import { createBasicInfo } from './basic-info/basic-info';
import { createPriceExplain } from './price/price';
import { createReasonSection } from './reason/reason';
import { createStrategyPanel } from './strategy/strategy';
import { FormStore } from './form-store';

type FormProps = {
  onSubmit(): void;
  BasicInfo: React.ComponentType;
  PriceExplain: React.ComponentType;
  Reason: React.ComponentType;
  StrategyPanel: React.ComponentType;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: designWidth[0],
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: designWidth[1],
    },
  },
}));

export const Form = React.memo(
  withTheme((props: FormProps & WithTheme) => {
    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit();
    };
    const styles = useStyles(props.theme);
    return (
      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Box padding={2} flex={1} className={styles.container}>
          <props.BasicInfo />
          <Divider />
          <Box mt={1} mb={1}>
            <props.Reason />
          </Box>
          <Divider />
          <Box mt={1} mb={2}>
            <props.PriceExplain />
          </Box>
          <Divider />
          <Box mt={1}>
            <props.StrategyPanel />
          </Box>
        </Box>
        <Button fullWidth variant="contained" color="primary" type="submit">
          买！买！买！
        </Button>
      </Box>
    );
  }),
);

export function createForm(
  submitIntention: (intention: IntentionSchema) => Promise<void>,
): React.ComponentType {
  const [BasicInfoComponent, basicInfoStore] = createBasicInfo();
  const [ReasonComponent, reasonStore] = createReasonSection();
  const [PriceExplainComponent, priceExplainStore] = createPriceExplain();
  const [StrategyPanel, strategyStore] = createStrategyPanel();
  const formStore = new FormStore(
    basicInfoStore,
    reasonStore,
    priceExplainStore,
    strategyStore,
    submitIntention,
  );

  const onSubmit = () => formStore.submit();
  return React.memo(() => (
    <Form
      onSubmit={onSubmit}
      BasicInfo={BasicInfoComponent}
      PriceExplain={PriceExplainComponent}
      Reason={ReasonComponent}
      StrategyPanel={StrategyPanel}
    />
  ));
}
