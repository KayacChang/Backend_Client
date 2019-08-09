import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import check from './check';
import { TextField } from '@material-ui/core';

const fieldStyle = makeStyles(theme => ({

  textField: {
    marginTop: theme.spacing(2)
  }

}));

export function Field(props) {
  const { type, name, label, setValue } = props;

  const classes = fieldStyle();

  const [context, setContext] = useState('');
  const [helper, setHelper] = useState(undefined);

  function handleChange(event) {
    event.persist();

    const { value } = event.target;

    setContext(value);

    const error = check[name](value);

    setHelper(error && error[name][0]);

    setValue(!error && value);
  }

  return (
    <TextField
      className={classes.textField} fullWidth
      variant="outlined"

      type={type}
      label={label}
      name={name}

      error={!!helper}
      helperText={helper}

      onChange={handleChange}
      value={context}
    />
  );
}
