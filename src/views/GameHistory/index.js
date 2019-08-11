import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HistoryTable } from './components';
import { Toolbar } from './components/Toolbar';

import { get, getCacheDB } from '../../services';

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

      const tables =
        JSON.parse(localStorage.getItem('products'))
          .find(({ name }) => name === product)
          .tables
          .sort((a, b) => b.name - a.name);

      console.log(tables);

      const tasks =
        tables.map(({name}) =>
          get(`/history/${product}/${name}`, config)
        );

      const res = await Promise.all(tasks);

      const data = res.map(({ data }) => data).flat();

      getCacheDB().then((db) => {
        const transaction = db.transaction('History', 'readwrite');

        const store = transaction.objectStore('History');

        data.forEach((record) => store.add(record));

        return transaction.complete;
      });

      setData(data);
    })();
  }, [product]);

  return (
    <div className={classes.root}>
      <Toolbar/>
      <div className={classes.content}>
        <HistoryTable data={data}/>
      </div>
    </div>
  );
}

