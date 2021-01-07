import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Link, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CryptoJS from 'crypto-js';
import LogRocket from 'logrocket';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography as MuiTypography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';

import { UserContext } from '../../../provider/UserProvider.js';
import { MuiButtonSpacingType } from '../../../types/types';
import ErrorSnackBar from '../../../_/atoms/error-snack-bar.atom';
import { login } from '../../../graphql/gqls/auth.gql';
import { globalToken } from '../../../graphql/client/client';
import ErrorBoundry from '../../../_/molecules/error-boundary.molecule';

const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const SignInButton = styled(MuiButton)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Box = styled.div`
  width: 70%;
  height: 70px;
  position: relative;
  margin: auto;
  margin-top: -30px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Typography = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.primary.main};
`;

const SignInTypography = styled(MuiTypography)`
  color: white;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

interface SignUpMessage {
  message: string;
}

const SignIn: React.FC<RouteProps> = (props) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    accessToken: '',
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authUser, decodeToken] = useContext(UserContext);
  const { state } = useLocation<SignUpMessage>();
  const signUpMessage = state && state.message ? state.message : null;

  useEffect(() => {
    const remember = localStorage.getItem('rememberMe');
    if (remember) {
      setRememberMe(true);
      const secret: string = process.env.REACT_APP_REMEMBER_ME_SECRET as string;
      const decrypted = CryptoJS.AES.decrypt(remember, secret).toString(CryptoJS.enc.Utf8);
      setCredentials({
        email: decrypted,
        password: '',
        accessToken: '',
      });
    } else {
      setRememberMe(false);
    }
  }, []);

  /**
   * Identify users within Analytics for LogRocket
   */
  const identifyUserLogRocket = () => {
    if (process.env.NODE_ENV === 'production') {
      LogRocket.identify(authUser.email, {
        name: `${authUser.firstName} ${authUser.lastName}`,
        email: authUser.email,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setSnackOpen(false);
      e.preventDefault();
      setIsSigningIn(true);
      const apiResult = await login('', credentials.email, credentials.password);
      if (apiResult.error) {
        setErrorMessage(apiResult.error);
      } else {
        if (rememberMe) {
          const secret: string = process.env.REACT_APP_REMEMBER_ME_SECRET as string;
          const encrypted = CryptoJS.AES.encrypt(credentials.email, secret).toString();
          window.localStorage.setItem('rememberMe', encrypted);
        } else {
          window.localStorage.removeItem('rememberMe');
        }
        decodeToken(apiResult.accessToken);
        globalToken.accessToken = apiResult.accessToken;
        setErrorMessage(null);
        setRedirect(true);
      }
    } catch (error) {
      setSnackOpen(true);
    }
    setIsSigningIn(false);
  };

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  if (redirect || authUser.isAuth) {
    identifyUserLogRocket();
    return <Redirect to="/dashboard" />;
  }

  return (
    <ErrorBoundry>
      <Wrapper>
        <Helmet title="Sign In" />
        <Box>
          <Img src={require('../../../utils/logo/Analytics Logo_RGB.png')} alt="Analytics logo" />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome back!
        </Typography>
        <Typography variant="body1" align="center">
          Sign in to your account to continue
        </Typography>
        {signUpMessage && !errorMessage ? <Alert severity="success">{signUpMessage}</Alert> : ''}
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ''}
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
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={credentials.password}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" onChange={handleRememberMe} color="default" checked={rememberMe} />}
            label="Remember me"
          />
          <SignInButton type="submit" fullWidth variant="contained" disabled={isSigningIn}>
            <SignInTypography variant="button">{isSigningIn ? <CircularProgress /> : 'Sign in'}</SignInTypography>
          </SignInButton>
        </form>
        <Button component={Link} to="/auth/reset-password" fullWidth color="primary">
          <Typography variant="button">Forgot password</Typography>
        </Button>
        <Button component={Link} to="/auth/resendemailverification" fullWidth color="primary">
          <Typography variant="button">Resend Email Verification</Typography>
        </Button>
        <ErrorSnackBar state={snackOpen} setState={setSnackOpen} />
      </Wrapper>
    </ErrorBoundry>
  );
};

export default SignIn;
