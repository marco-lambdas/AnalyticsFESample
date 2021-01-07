import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, RouteProps } from 'react-router-dom';
import { MuiButtonSpacingType } from '../../../types/types';
import { Helmet } from 'react-helmet';
import { GraphQLError } from 'graphql';

import { FormControl, Input, InputLabel, Button as MuiButton, Paper, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { Alert } from '@material-ui/lab';

import { resendEmail } from '../../../graphql/gqls/auth.gql';
const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const ResendEmailVerification: React.FC<RouteProps> = () => {
  const [credentials, setCredentials] = useState({
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiResult = await resendEmail(credentials.email);
    if (apiResult.graphQLErrors) {
      const errors: GraphQLError[] = apiResult.graphQLErrors;
      setErrorMessage(
        errors.map((error) =>
          error.message === 'Bad Request Exception' ? error?.extensions?.exception?.response.message[0] : error.message,
        ),
      );
      return;
    }
    setSubmitted(true);
  };

  return (
    <Wrapper>
      <Helmet title="Resend Email Verification" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Resend Email Verification
      </Typography>
      {!submitted ? (
        <Typography component="h2" variant="body1" align="center">
          Enter your email account in the field below.
        </Typography>
      ) : (
        ''
      )}
      {errorMessage && !submitted ? (
        <Alert severity="error">{errorMessage.map((err) => err.charAt(0).toUpperCase() + err.slice(1) + '')}</Alert>
      ) : (
        ''
      )}
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              value={credentials.email}
            />
          </FormControl>
          <MuiButton type="submit" fullWidth variant="contained" color="primary">
            Resend Email Verification
          </MuiButton>
          <Button component={Link} to="/auth/sign-in" fullWidth color="primary">
            Back
          </Button>
        </form>
      ) : (
        <React.Fragment>
          <Alert severity="success">Email successfully sent. Please check you spam folder if you don't find one.</Alert>
          <Button component={Link} to="/auth/sign-in" fullWidth color="primary">
            Back
          </Button>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default ResendEmailVerification;
