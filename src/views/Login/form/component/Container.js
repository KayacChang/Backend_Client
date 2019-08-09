import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import React from 'react';

const FormContainerStyle = makeStyles(theme => ({

  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  }

}));

export function FormContainer({ children }) {
  const classes = FormContainerStyle();

  return (
    <Grid
      className={classes.content} item lg={7} xs={12}>

      <div className={classes.content}>

        <div className={classes.contentBody}>
          {children}
        </div>

      </div>

    </Grid>
  );
}
