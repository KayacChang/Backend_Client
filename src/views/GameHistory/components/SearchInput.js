import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    margin: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

export function SearchInput(props) {
  const { onChange, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper
      {...rest}
      className={classes.root}>

      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />

    </Paper>
  );
}

