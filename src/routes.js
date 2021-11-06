/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DetailLayout from './layouts/DetailLayout';
import DefaultLayout from './layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import PrivatePartyList from './pages/PrivateParty/List';
import PrivatePartyDetail from './pages/PrivateParty/Details';
import PrivatePartyCreator from './pages/PrivateParty/Creator';
import PublicParty from './pages/PublicParty';
import JoinedSuccess from './pages/JoinedSuccess';
import TransferSuccess from './pages/TransferSuccess';
import AddFunds from './pages/AddFunds';
import Login from './pages/Auth/Login';
import { AnimatePresence } from "framer-motion";
import Welcome from 'pages/Welcome';
import Profile from 'pages/Profile';
import ProfileLayout from 'layouts/ProfileLayout';
import SignUp from 'pages/Auth/SignUp';
import Splash from 'pages/Splash';

const renderRoutes = (props) => (
  <AnimatePresence>
    <Switch>
      <Route exact path="/private-party">
        <MainLayout>
          <PrivatePartyList />
        </MainLayout>
      </Route>
      <Route path="/private-party/create">
        <DetailLayout>
          <PrivatePartyCreator />
        </DetailLayout>
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
      <Route exact path="/joined-success">
        <DefaultLayout>
          <JoinedSuccess />
        </DefaultLayout>
      </Route>
      <Route exact path="/transfer-success">
        <DefaultLayout>
          <TransferSuccess />
        </DefaultLayout>
      </Route>
      <Route path="/add-funds">
        <DetailLayout>
          <AddFunds />
        </DetailLayout>
      </Route>
      <Route exact path="/dashboard">
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </Route>
      <Route exact path="/login">
        <DefaultLayout>
          <Login />
        </DefaultLayout>
      </Route>
      <Route exact path="/signup">
        <DefaultLayout>
          <SignUp />
        </DefaultLayout>
      </Route>
      <Route exact path="/welcome">
        <DefaultLayout>
          <Welcome />
        </DefaultLayout>
      </Route>
      <Route path="/profile">
        <ProfileLayout>
          <Profile />
        </ProfileLayout>
      </Route>
      <Route path="/">
        <Splash />
      </Route>
      {/* <Redirect from="/" to="/welcome"/> */}
    </Switch>
  </AnimatePresence>
);


export default renderRoutes;
