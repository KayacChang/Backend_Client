import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2, 0)
  }
}));

export function Submit(props) {
  const { enable } = props;

  const classes = useStyle();

  return (
    <Button
      className={classes.button} fullWidth
      size="large" color="primary"
      variant="contained"

      type="submit"
      disabled={!enable}>
      Submit
    </Button>
  );
}
