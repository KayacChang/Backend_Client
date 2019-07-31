import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HistoryTable } from './components';
import mockData from './data';
import { Toolbar } from './components/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const GameHistory = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        <HistoryTable users={users} />
      </div>
    </div>
  );
};

