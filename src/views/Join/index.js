import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Quote } from './Quote';
import { Form } from './Form';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  }
}));

export function Join(props) {
  const { history } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid className={classes.grid} container>

        <Quote/>

        <Form history={history}/>

      </Grid>

    </div>
  );
}
