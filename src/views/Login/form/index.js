import { Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { Field, Forget, FormContainer, Submit } from './components';

import { post } from 'services';

const FormStyles = makeStyles(theme => ({

  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },

  title: {
    marginTop: theme.spacing(3)
  }

}));

export function Form(props) {
  const { history } = props;

  const classes = FormStyles();

  const [email, setEmail] = useState(undefined);

  const [password, setPassword] = useState(undefined);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const {data} = await post('users/auth', { email, password });

      localStorage.setItem('user', JSON.stringify(data));

      return history.push('/');

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormContainer>
      <form
        className={classes.form} onSubmit={handleLogin}>

        <Typography className={classes.title} variant="h2">
          Sign in
        </Typography>

        <Field
          name="email" type="text" label="Email address" setValue={setEmail}/>

        <Field
          name="password" type="password" label="Password" setValue={setPassword}/>

        <Submit enable={email && password}/>

        <Forget/>

      </form>
    </FormContainer>
  );
}

