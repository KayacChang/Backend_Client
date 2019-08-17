import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { splitEvery } from 'ramda';

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

async function fetchHistory(product, params) {
  const fetchConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.user).token
    }
  };

  const search = params ? '?' + new URLSearchParams(params) : '';

  const url = `/history/${product}${search}`;

  const { data } = await get(url, fetchConfig);

  return data;
}

async function fetchCount(product) {
  const fetchConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.user).token
    }
  };

  const url = `/history-counts/${product}`;

  const { data } = await get(url, fetchConfig);

  return data.counts;
}

export function GameHistory(props) {
  const classes = useStyles();
  const { product } = props.match.params;

  const [data, setData] = useState([]);

  const [displayData, setDisplayData] = useState([[]]);

  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [fetching, setFetching] = useState(undefined);

  useEffect(() => {
    (async () => {

      const [history, count] =
        await Promise.all([
          fetchHistory(product),
          fetchCount(product)
        ]);

      setCount(count);

      setData(history);
    })();
  }, [product]);

  useEffect(() => {

    const displayData = splitEvery(rowsPerPage, data);

    setDisplayData(displayData);

  }, [data, rowsPerPage]);

  async function onChangePage(event, page) {
    if (displayData.length > page) setPage(page);

    const from = data.length;
    const limit = 10 * rowsPerPage;

    const dontFetch =
      data.length === count ||
      page * rowsPerPage < data.length / 2 ||
      fetching === from;

    if (dontFetch) return;

    setFetching(from);

    const newData = await fetchHistory(product, { from, limit });

    setFetching(undefined);

    if (!newData) return;

    setData([...data, ...newData]);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  return (
    <div className={classes.root}>
      <Toolbar
        data={data} setData={setData}
        page={page}
        onChangePage={onChangePage}
        fetchHistory={(params) => fetchHistory(product, params)}
      />

      <div className={classes.content}>
        <HistoryTable
          data={displayData[page]}
          count={count}
          page={page} onChangePage={onChangePage}
          rowsPerPage={rowsPerPage} onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </div>

    </div>
  );
}

