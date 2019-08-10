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

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: JSON.parse(localStorage.user).token
        }
      };

      const { data } = await get(`/exchange/${product}`, config);

      setData(data);
      setOrigin(data);
    })();
  }, [product]);

  return (
    <div className={classes.root}>
      <Toolbar data={origin} setData={setData}/>
      <div className={classes.content}>
        <HistoryTable data={data}/>
      </div>
    </div>
  );
}

