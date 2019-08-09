import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({

  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },

  spacer: {
    flexGrow: 1
  },

  button: {
    marginRight: theme.spacing(1)
  },

  searchInput: {
    marginRight: theme.spacing(1)
  }

}));

export function Toolbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div className={classes.row}>
        <span className={classes.spacer}/>
        <Button className={classes.button}>Import</Button>
        <Button className={classes.button}>Export</Button>
        <Button color="primary" variant="contained">Add product</Button>
      </div>

      <div className={classes.row}>
        <SearchInput className={classes.searchInput} placeholder="Search product"/>
      </div>

    </div>
  );
}

