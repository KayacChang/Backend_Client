import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  ProductList as ProductListView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,

  Home,
  GameHistory,
  ExchangeHistory,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home"/>

      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path="/home"
      />

      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path={["/exchange", "/history"]}
      />

      <RouteWithLayout
        component={ExchangeHistory}
        layout={MainLayout}
        path="/exchange/:product"
      />

      <RouteWithLayout
        component={GameHistory}
        layout={MainLayout}
        path="/history/:product"
      />

      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
