import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  FormContainer, Field, Submit, Policy
} from './components';

import { post } from 'services';

const HeaderStyle = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3)
  }
}));

function Header() {
  const classes = HeaderStyle();

  return (
    <>
      <Typography className={classes.title} variant="h2">
        Create new account
      </Typography>

      <Typography color="textSecondary" gutterBottom>
        Use your email to create new account
      </Typography>
    </>
  );
}

const FormStyle = makeStyles(theme => ({

  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }

}));


export function Form(props) {
  const { history } = props;
  
  const classes = FormStyle();

  const [userName, setUserName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [policy, setPolicy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { status } = await post('users/register', { userName, email, password });

      if (status !== 201) throw new Error(`Register Failed...`);

      const {data} = await post('users/auth', { email, password });

      localStorage.setItem('user', JSON.stringify(data));

      return history.push('/');

    } catch (err) {
      console.error(err);
    }

  }

  return (
    <FormContainer>
      <form className={classes.form} onSubmit={handleSubmit}>

        <Header/>

        <Field
          type="text" label="User name" name="userName" setValue={setUserName}/>

        <Field
          type="text" label="Email address" name="email" setValue={setEmail}/>

        <Field
          type="password" label="Password" name="password" setValue={setPassword}/>

        <Policy setValue={setPolicy}/>

        <Submit enable={userName && email && password && policy}/>

      </form>
    </FormContainer>
  );
}

