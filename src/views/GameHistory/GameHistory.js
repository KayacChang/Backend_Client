import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'axios';

import { HistoryTable } from './components';
import { Toolbar } from './components/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const GameHistory = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const {product} = props.match;

      const result = await axios(
        'http://localhost:8080/games/catpunch/history/date/20190806'
      );

      setData(result.data);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        <HistoryTable data={data} />
      </div>
    </div>
  );
};

