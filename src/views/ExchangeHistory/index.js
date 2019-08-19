import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HistoryTable, Toolbar } from './components';

import { isEmpty, splitEvery } from 'ramda';
import { get } from '../../services';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

async function fetchExchange(product, params) {
  const fetchConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.user).token
    }
  };

  const search = params ? '?' + new URLSearchParams(params) : '';

  const url = `/exchange/${product}${search}`;

  const { data } = await get(url, fetchConfig);

  return data;
}

async function fetchCount(product) {
  const fetchConfig = {
    headers: {
      Authorization: JSON.parse(localStorage.user).token
    }
  };

  const url = `/exchange-counts/${product}`;

  const { data } = await get(url, fetchConfig);

  return data.counts;
}

export function ExchangeHistory(props) {
  const classes = useStyles();

  const { product } = props.match.params;

  const [data, setData] = useState([]);

  const [displayData, setDisplayData] = useState([[]]);

  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filter, setFilter] = useState({});

  const [fetching, setFetching] = useState(false);

  async function fetchNewExchange(params = {}) {

    if (isEmpty(params)) {
      const [history, count] =
        await Promise.all([
          fetchExchange(product),
          fetchCount(product)
        ]);

      setCount(count);

      return history;
    }

    return fetchExchange(product, params);
  }

  useEffect(() => {
    fetchNewExchange()
      .then((data) => setData(data));

  }, []);

  useEffect(() => {
    const displayData = splitEvery(rowsPerPage, data);

    setDisplayData(displayData);

  }, [data, rowsPerPage]);


  function onChangePage(event, page) {
    if (displayData.length > page) setPage(page);

    const noMoreData = data.length === count;
    const lessThenHalfPage = displayData.length / 2 > page;

    if (!isEmpty(filter) || fetching || noMoreData || lessThenHalfPage) return;

    fetchNext();
  }

  async function fetchNext() {
    const params = {
      from: data.length,
      limit: 10 * rowsPerPage
    };

    setFetching(true);

    const history = await fetchNewExchange(params);

    setData([...data, ...history]);

    setFetching(false);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  return (
    <div className={classes.root}>
      <Toolbar
        data={data}
        setData={setData}

        page={page}
        setPage={setPage}

        filter={filter}
        setFilter={setFilter}

        setCount={setCount}

        fetch={fetchNewExchange}
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

