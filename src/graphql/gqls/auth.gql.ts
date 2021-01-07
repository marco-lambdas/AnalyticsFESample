import gql from 'graphql-tag';
import { ExecGraphQL } from '../client/client';
import User from '../../interfaces/user.interface';

const LOGIN_QL = gql`
  mutation($credentials: SignInCredentialsInput!) {
    SignIn(authCredentialsInput: $credentials) {
      accessToken
      error
    }
  }
`;

const SIGN_UP_QL = gql`
  mutation($credentials: SignUpCredentialsInput!) {
    SignUp(authCredentialsInput: $credentials) {
      email
    }
  }
`;

const REFRESH_TOKEN_QL = gql`
  query {
    RefreshToken {
      accessToken
    }
  }
`;

const CONFIRM_EMAIL_QL = gql`
  mutation($emailToken: ConfirmEmailInput!) {
    ConfirmEmail(confirmEmailInput: $emailToken) {
      accessToken
    }
  }
`;

const RESEND_EMAIL_QL = gql`
  query($emailObj: ResendEmailInput!) {
    ResendEmailVerification(resendEmailInput: $emailObj)
  }
`;

const LOGOUT_QL = gql`
  query {
    Logout
  }
`;

export const login = async (setUser: string, email: string, password: string) => {
  const apiResult = await ExecGraphQL(LOGIN_QL, {
    credentials: { email, password },
  });
  return apiResult.SignIn;
};

export const signUp = async (user: User) => {
  const apiResult = await ExecGraphQL(SIGN_UP_QL, {
    credentials: { ...user },
  });
  return apiResult;
};

export const refreshToken = async () => {
  const apiResult = await ExecGraphQL(REFRESH_TOKEN_QL);
  return apiResult;
};

export const confirmEmail = async (emailToken: string) => {
  const apiResult = await ExecGraphQL(CONFIRM_EMAIL_QL, { emailToken: { emailToken } });
  return apiResult;
};

export const resendEmail = async (email: string) => {
  const apiResult = await ExecGraphQL(RESEND_EMAIL_QL, { emailObj: { email } });
  return apiResult;
};

export const logout = async () => {
  const apiResult = await ExecGraphQL(LOGOUT_QL);
  return apiResult;
};
