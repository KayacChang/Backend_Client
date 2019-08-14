import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

import { HistoryTable } from './components';
import { Toolbar } from './components/Toolbar';

import { get } from '../../services';

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

  const [origin, setOrigin] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {

      const config = {
        headers: {
          Authorization: JSON.parse(localStorage.user).token
        }
      };

      const current = '20190814';

      const [historyRes, countRes] =
        await Promise.all([
          get(`/history/${product}/${current}`, config),
          get(`/counts/${product}`, config)
        ]);

      setCount(countRes.data.count);

      setOrigin(historyRes.data);
      setData(historyRes.data);
    })();
  }, [product]);

  return (
    <div className={classes.root}>
      <Toolbar data={origin} setData={setData}/>
      <div className={classes.content}>
        <HistoryTable data={data} count={count}/>
      </div>
    </div>
  );
}

