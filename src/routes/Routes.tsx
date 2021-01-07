import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { dashboardLayoutRoutes, authLayoutRoutes } from './index';

import DashboardLayout from '../layouts/Dashboard';
import AuthLayout from '../layouts/Auth';
import PrivateRoute from './PrivateRoute';
import Page404 from '../pages/error/page404/Page404';
import { RouteInfoType } from '../types/types';

const childRoutes = (Layout: React.ElementType, routes: Array<RouteInfoType>) =>
  routes.map(({ component: Component, children, path }, index: number) => {
    return children ? (
      children.map((element, index: number) => (
        <Route
          key={index}
          path={element.path}
          exact
          render={(props: RouteComponentProps) => (
            <Layout>
              <element.component {...props} />
            </Layout>
          )}
        />
      ))
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    ) : null;
  });

const protectedChildRoutes = (Layout: React.ElementType, routes: Array<RouteInfoType>) =>
  routes.map(({ component: Component, children, path }, index: number) => {
    return children ? (
      children.map((element, index: number) => (
        <Route
          key={index}
          path={element.path}
          exact
          render={(props: RouteComponentProps) => (
            <PrivateRoute>
              <Layout>
                <element.component {...props} />
              </Layout>
            </PrivateRoute>
          )}
        />
      ))
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <PrivateRoute>
            <Layout>
              <Component {...props} />
            </Layout>
          </PrivateRoute>
        )}
      />
    ) : null;
  });

const Routes = () => (
  <Router>
    <Switch>
      {protectedChildRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {childRoutes(AuthLayout, authLayoutRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
