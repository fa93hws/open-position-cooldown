import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withTheme, WithTheme } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import { sizes } from '../../../styles/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',
    minWidth: 0,
    padding: 0,
    height: sizes[1],
    width: sizes[1],
  },
}));

export const AddButton = withTheme(
  (props: WithTheme & { onClick: () => void }) => {
    const styles = useStyles(props.theme);
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={props.onClick}
        className={styles.button}
      >
        <Add />
      </Button>
    );
  },
);
