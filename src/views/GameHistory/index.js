import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HistoryTable } from './components';
import { Toolbar } from './components/Toolbar';

import { get } from 'services';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export function GameHistory(props) {
  const classes = useStyles();
  const { product } = props.match.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: JSON.parse(localStorage.user).token
        }
      };

      const { data } = await get(`/history/${product}`, config);

      setData(data);
    })();
  }, [data.length, product]);

  return (
    <div className={classes.root}>
      <Toolbar/>
      <div className={classes.content}>
        <HistoryTable data={data}/>
      </div>
    </div>
  );
}

