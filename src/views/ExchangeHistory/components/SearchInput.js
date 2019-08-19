import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import NumberFormat from 'react-number-format';

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
    letterSpacing: '-0.05px',
    border: 0
  }
}));

function TimeFormat(props) {
  const { inputRef, onChange, ...other } = props;

  const format = '####/##/## ##:##';

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={({value}) => onChange(value)}
      format={format}
    />
  );
}

export function TimeInput(props) {
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
        inputComponent={TimeFormat}
      />

    </Paper>
  );
}

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

