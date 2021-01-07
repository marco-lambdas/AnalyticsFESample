import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GraphQLError } from 'graphql';

import { FormControl, Input, InputLabel, Button as MuiButton, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { signUp } from '../../../graphql/gqls/auth.gql';

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiResult = await signUp(form);
    if (apiResult.graphQLErrors) {
      const errors: GraphQLError[] = apiResult.graphQLErrors;
      setErrorMessage(
        errors.map((error) =>
          error.message === 'Bad Request Exception' ? error?.extensions?.exception?.response.message[0] : error.message,
        ),
      );
      return;
    }

    setRedirect(true);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/auth/sign-in',
          state: { message: 'Registered successfully. An email confirmation has been sent to your email address.' },
        }}
      />
    );
  }

  return (
    <Wrapper>
      <Helmet title="Sign Up" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Sign up
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Please fill the fields.
      </Typography>
      {errorMessage ? (
        <Alert severity="error">{errorMessage.map((err) => err.charAt(0).toUpperCase() + err.slice(1) + '')}</Alert>
      ) : (
        ''
      )}
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" name="firstName" onChange={handleInputChange} autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" name="lastName" onChange={handleInputChange} />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" onChange={handleInputChange} autoComplete="email" />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </FormControl>
        <MuiButton type="submit" fullWidth variant="contained" color="primary">
          Sign up
        </MuiButton>
      </form>
    </Wrapper>
  );
};

export default SignUp;
