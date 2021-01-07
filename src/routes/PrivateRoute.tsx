import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';

const PrivateRoute = (props: any) => {
  const [authUser] = useContext(UserContext);

  return authUser && authUser.isAuth ? props.children : <Redirect to={'/auth/sign-in'} />;
};

export default PrivateRoute;
