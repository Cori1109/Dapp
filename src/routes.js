/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PrivateParty from './pages/PrivateParty';
import { AnimatePresence } from "framer-motion";

const renderRoutes = (props) => (
  <AnimatePresence>
    <Switch>
      <Route path="/private-party">
        <MainLayout>
          <PrivateParty />
        </MainLayout>
      </Route>
      <Route path="/public-party">
        <MainLayout>
        </MainLayout>
      </Route>
      <Route path="/dashboard">
        <MainLayout>
          <Dashboard setTheme={props.setTheme} />
        </MainLayout>
      </Route>
      <Redirect from="/" to="/dashboard"/>
    </Switch>
  </AnimatePresence>
);


export default renderRoutes;
