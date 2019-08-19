import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { SearchInput, TimeInput } from './SearchInput';

import { clone, isEmpty } from 'ramda';
import { debounce } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    height: '42px',
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  spacer: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(1)
  }

}));

export function Toolbar(props) {
  const { setData, setPage, setCount, filter, setFilter, fetch } = props;

  const classes = useStyles();

  function findByID(filter, uid) {

    if (!uid) {
      delete filter['uid'];

      return filter;
    }

    filter['uid'] = uid;

    return filter;
  }

  function findByUser(filter, userID) {

    if (!userID) {
      delete filter['userID'];

      return filter;
    }

    filter['userID'] = userID;

    return filter;
  }

  function matchDateTime(str) {
    return /^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?$/.exec(str);
  }

  function findByTimeStart(filter, value) {
    const name = 'timeStart';

    if (value.length < 8) {
      delete filter[name];

      return filter;
    }

    let [, year, month, day, hours, minutes] = matchDateTime(value);

    if (!hours) hours = '00';
    if (!minutes) minutes = '00';

    filter[name] = [year, month, day, hours, minutes].join('');

    return filter;
  }

  function findByTimeEnd(filter, value) {
    const name = 'timeEnd';

    if (value.length < 8) {
      delete filter[name];

      return filter;
    }

    let [, year, month, day, hours, minutes] = matchDateTime(value);

    if (!hours) hours = '23';
    if (!minutes) minutes = '59';

    filter[name] = [year, month, day, hours, minutes].join('');

    return filter;
  }

  function checkFilter(func, value) {

    const newFilter = func(clone(filter), value);

    setFilter(newFilter);

    return newFilter;
  }

  function onChange(func) {

    const execute = debounce(execution, 300);

    return function(arg) {
      if (arg.target) return execute(arg.target.value);

      return execute(arg);
    };

    async function execution(value) {

      const newFilter = checkFilter(func, value);

      const history = await fetch(newFilter);

      if (!history) return;

      if (!isEmpty(newFilter)) setCount(history.length);

      setData(history);

      setPage(0);
    }
  }

  return (
    <div
      className={classes.root}>

      <div className={classes.row}>

        <Search/>

        <SearchInput
          placeholder="單號"
          onChange={onChange(findByID)}
        />

        <SearchInput
          placeholder="用戶ID"
          onChange={onChange(findByUser)}
        />

        <TimeInput
          placeholder="開始時間"
          onChange={onChange(findByTimeStart)}
        />

        <span>-</span>

        <TimeInput
          placeholder="結束時間"
          onChange={onChange(findByTimeEnd)}
        />

      </div>

      <div className={classes.row}>

        <Button
          variant="contained"
          className={classes.button}>
          導出全部
        </Button>

        <Button
          variant="contained"
          className={classes.button}>
          導出所選
        </Button>

      </div>

    </div>
  );
}

