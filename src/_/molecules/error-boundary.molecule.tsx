import React, { Component, ErrorInfo, ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Button as MuiButton, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { MuiButtonSpacingType } from '../../types/types';
import { UserContext } from '../../provider/UserProvider.js';
import { globalToken } from '../../graphql/client/client';
import { logout } from '../../graphql/gqls/auth.gql';

import { ErrorBoundaryLogger } from '../../utils/Logger';

const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;
  margin-top: 100px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  authorized: boolean;
}

const FallBackUIV: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  const [, , setAuthUser] = useContext(UserContext);
  const handleLogout = () => async () => {
    await logout();
    globalToken.accessToken = '';
    setAuthUser({ firstName: '', lastName: '', email: '', token: null, isAuth: false });
    const dateTime = new Date(Date.now()) + '';
    window.localStorage.setItem('logout', dateTime);
  };

  if (!authorized) handleLogout();

  return (
    <Wrapper>
      <Helmet title="Unexpected Error" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        <ErrorOutline color="error" />
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Sorry something went wrong with the page
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        Kindly refresh again and if its still not working contact System Administrator
      </Typography>

      <Button component={Link} to="/dashboard" variant="contained" color="primary" mt={2}>
        Return to Home
      </Button>
    </Wrapper>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    authorized: true,
  };

  public static getDerivedStateFromError(error: Error): State {
    const authorized = !error.message.includes('Unauthorized Access');
    return { hasError: true, authorized };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ErrorBoundaryLogger(error, errorInfo);
  }

  public render() {
    return this.state.hasError ? <FallBackUIV authorized={this.state.authorized} /> : this.props.children;
  }
}

export default ErrorBoundary;
