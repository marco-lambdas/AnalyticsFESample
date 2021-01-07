import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { MuiButtonSpacingType } from '../../../types/types';
import { spacing } from '@material-ui/system';
import { Button as MuiButton, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { confirmEmail } from '../../../graphql/gqls/auth.gql';
import { GraphQLError } from 'graphql';

const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const EmailConfirmation: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  useEffect(() => {
    const confirmEmailCall = async () => {
      const apiResult = await confirmEmail(token);
      if (apiResult.graphQLErrors) {
        const errors: GraphQLError[] = apiResult.graphQLErrors;
        setErrorMessage(
          errors.map((error) =>
            error.message === 'Bad Request Exception'
              ? error?.extensions?.exception?.response.message[0]
              : error.message,
          ),
        );
        return;
      }
      setSubmitted(true);
    };
    confirmEmailCall();
  }, [token]);

  return (
    <Wrapper>
      <Helmet title="Email Confirmation" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Email Confirmation
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
      {submitted ? <Alert severity="success">Email successfully verified. You can now login.</Alert> : ''}
      <Button component={Link} to="/auth/sign-in" fullWidth color="primary">
        Back to Login
      </Button>
    </Wrapper>
  );
};

export default EmailConfirmation;
