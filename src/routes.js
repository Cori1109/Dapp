/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DetailLayout from './layouts/DetailLayout';
import Dashboard from './pages/Dashboard';
import PrivatePartyList from './pages/PrivateParty/List';
import PrivatePartyDetail from './pages/PrivateParty/Details';
import PublicParty from './pages/PublicParty';
import { AnimatePresence } from "framer-motion";
import AddFunds from 'pages/AddFunds';

const renderRoutes = (props) => (
  <AnimatePresence>
    <Switch>
      <Route exact path="/private-party">
        <MainLayout>
          <PrivatePartyList />
        </MainLayout>
      </Route>
      <Route path="/private-party/:partyId">
        <DetailLayout>
          <PrivatePartyDetail />
        </DetailLayout>
      </Route>
      <Route exact path="/public-party">
        <MainLayout>
          <PublicParty />
        </MainLayout>
      </Route>
      <Route exact path="/dashboard">
        <MainLayout>
          <Dashboard setTheme={props.setTheme} />
        </MainLayout>
      </Route>
      <Redirect from="/" to="/dashboard"/>
    </Switch>
  </AnimatePresence>
);


export default renderRoutes;
