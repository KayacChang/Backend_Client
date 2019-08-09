import { makeStyles } from '@material-ui/styles';
import { Checkbox, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import check from './check';

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

const CheckStyle = makeStyles(theme => ({
  policyCheckbox: {
    marginLeft: '-14px'
  }
}));

export function Check(props) {
  const { setValue } = props;

  const classes = CheckStyle();

  const [context, setContext] = useState(false);

  function handleChange(event) {
    event.persist();

    const value = event.target.checked;

    setContext(value);
    setValue(value);
  }

  return (
    <Checkbox
      className={classes.policyCheckbox}
      color="primary"
      name="policy"

      checked={context}
      onChange={handleChange}
    />
  );
}
