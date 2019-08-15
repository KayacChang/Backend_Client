import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HistoryTable, Toolbar } from './components';

import { get } from 'services';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export function ExchangeHistory(props) {
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

      const [orderRes, countRes] =
        await Promise.all([
          get(`/exchange/${product}`, config),
          get(`/exchange-counts/${product}`, config)
        ]);

      setData(orderRes.data);
      setOrigin(orderRes.data);
      setCount(countRes.data.count);
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

