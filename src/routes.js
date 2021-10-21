/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

const renderRoutes = () => (
  <Switch>
    <Route path="/private-party">
      <MainLayout>
      </MainLayout>
    </Route>
    <Route path="/public-party">
      <MainLayout>
      </MainLayout>
    </Route>
    <Route path="/dashboard">
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </Route>
    <Redirect from="/" to="/dashboard"/>
  </Switch>
);


export default renderRoutes;
