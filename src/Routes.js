import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,

  Home,
  GameHistory,
  ExchangeHistory,
  Login,
  Join,
  ProductList,
} from './views';

function currentUser() {
  const {exp} = JSON.parse(localStorage.getItem('user'));

  const isExpired = Date.now() > exp * 1000;

  if ( isExpired ) localStorage.removeItem('user');

  return !isExpired;
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
        component={ProductList}
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
