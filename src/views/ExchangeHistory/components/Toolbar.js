import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { SearchInput } from './SearchInput';

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
  },

  searchInput: {
    margin: theme.spacing(1)
  }
}));

export function Toolbar(props) {
  const { data, setData } = props;

  const classes = useStyles();

  function findByID(event) {
    let target = data;

    const targetID = event.target.value;

    if (targetID) {
      target = data.filter(({ id }) => id === Number(targetID));
    }

    setData(target);
  }

  return (
    <div
      className={classes.root}>

      <div className={classes.row}>

        <Search/>

        <SearchInput
          className={classes.searchInput}
          placeholder="單號"
          onChange={findByID}
        />

        <SearchInput
          className={classes.searchInput}
          placeholder="用戶ID"
        />

        <SearchInput
          className={classes.searchInput}
          placeholder="開始時間"
        />

        <span>-</span>

        <SearchInput
          className={classes.searchInput}
          placeholder="結束時間"
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

