import * as React from 'react';
import { Button, Box, Divider } from '@material-ui/core';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';

import { designWidth } from '@styles/styles';
import { createBasicInfo } from './basic-info/basic-info';
import { createPriceExplain } from './price/price';
import { createReasonSection } from './reason/reason';

type FormProps = {
  onSubmit(): void;
  BasicInfo: React.ComponentType;
  PriceExplain: React.ComponentType;
  Reason: React.ComponentType;
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
          <Box mt={1}>
            <props.Reason />
          </Box>
          <Divider />
          <Box mt={1}>
            <props.PriceExplain />
          </Box>
        </Box>
        <Button fullWidth variant="contained" color="primary" type="submit">
          买！买！买！
        </Button>
      </Box>
    );
  }),
);

export function createForm() {
  const [BasicInfoComponent, basicInfoStore] = createBasicInfo();
  const [PriceExplainComponent, priceExplainStore] = createPriceExplain();
  const [ReasonComponent, reasonStore] = createReasonSection();

  const onSubmit = () => {
    basicInfoStore.startValidate();
    priceExplainStore.startValidate();
    reasonStore.startValidate();
  };
  return React.memo(() => (
    <Form
      onSubmit={onSubmit}
      BasicInfo={BasicInfoComponent}
      PriceExplain={PriceExplainComponent}
      Reason={ReasonComponent}
    />
  ));
}
