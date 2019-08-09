import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Back } from './Back';

const useStyles = makeStyles(theme => ({

  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },

}));

export function FormContainer({ children }) {
  const classes = useStyles();

  return (
    <Grid className={classes.content} item lg={7} xs={12}>

      <div className={classes.content}>

        <div className={classes.contentHeader}>
          <Back/>
        </div>

        <div className={classes.contentBody}>
          {children}
        </div>

      </div>

    </Grid>
  );
}
