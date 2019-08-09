import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Check } from './Input';

function a(text) {
  return (
    <Link color="primary" variant="h6" underline="always" component={RouterLink} to="#">
      {text}
    </Link>
  );
}

const PolicyStyle = makeStyles(theme => ({
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  }
}));

export function Policy(props) {
  const { setValue } = props;

  const classes = PolicyStyle();

  return (
    <div className={classes.policy}>

      <Check setValue={setValue}/>

      <Typography color="textSecondary" variant="body1">
        I have read the {a('Terms and Conditions')}
      </Typography>

    </div>
  );
}
