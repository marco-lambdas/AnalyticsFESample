import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import { refreshToken } from '../graphql/gqls/auth.gql';
import { globalToken } from '../graphql/client/client';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    token: null,
    isAuth: false,
  });

  const decodeToken = (accessToken) => {
    const decodedToken = jwt_decode(accessToken);
    setAuthUser({
      ...decodedToken,
      accessToken,
      isAuth: true,
    });
  };

  useEffect(() => {
    const refreshTokenCall = async () => {
      const apiResult = await refreshToken();
      if (apiResult.RefreshToken) {
        if (apiResult.RefreshToken.accessToken) {
          decodeToken(apiResult.RefreshToken.accessToken);
          globalToken.accessToken = apiResult.RefreshToken.accessToken;
        }
      }
    };
    if (!authUser.isAuth) {
      refreshTokenCall();
    }
  }, [authUser.isAuth]);

  useEffect(() => {
    function syncLogout(e) {
      if (e.key === 'logout') {
        return <Redirect to="/auth/sign-in" />;
      }
    }
    // for logout
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

  return <UserContext.Provider value={[authUser, decodeToken, setAuthUser]}>{props.children}</UserContext.Provider>;
};
