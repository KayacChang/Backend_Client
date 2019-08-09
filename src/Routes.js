import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  ProductList as ProductListView,
  NotFound as NotFoundView,

  Home,
  GameHistory,
  ExchangeHistory,
  Login,
  Join
} from './views';

function currentUser() {
  return localStorage.getItem('user');
}

function Protect(props) {
  return (
    currentUser() ?
      <RouteWithLayout {...props}/> : <Redirect to="/login"/>
  );
}

const Routes = () => {

  return (
    <Switch>

      <Protect
        component={Home}
        exact
        layout={MainLayout}
        path="/"
      />

      <Protect
        component={ProductListView}
        exact
        layout={MainLayout}
        path={['/exchange', '/history']}
      />

      <Protect
        component={ExchangeHistory}
        layout={MainLayout}
        path="/exchange/:product"
      />

      <Protect
        component={GameHistory}
        layout={MainLayout}
        path="/history/:product"
      />

      <RouteWithLayout
        component={Login}
        exact
        layout={MinimalLayout}
        path="/login"
      />

      <RouteWithLayout
        component={Join}
        exact
        layout={MinimalLayout}
        path="/join"
      />

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="*"
      />

    </Switch>
  );
};

export default Routes;
