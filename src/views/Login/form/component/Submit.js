import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({

  signInButton: {
    margin: theme.spacing(2, 0)
  }

}));

export function Submit(props) {
  const { enable } = props;

  const classes = useStyles();

  return (
    <Button
      className={classes.signInButton} fullWidth
      size="large" color="primary"
      variant="contained"

      type="submit"
      disabled={!enable}>
      Submit
    </Button>
  );
}
