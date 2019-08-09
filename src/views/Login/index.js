import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Quote } from './Quote';
import { Form } from './form';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
}));

export function Login(props) {
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

Login.propTypes = {
  history: PropTypes.object
};
