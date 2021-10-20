/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

const renderRoutes = () => (
    <Switch>
    {/* If the current URL is /about, this route is rendered
        while the rest are ignored */}
    <Route path="/private-party">
      <MainLayout>
      </MainLayout>
    </Route>
    <Route path="/public-party">
      <MainLayout>
      </MainLayout>
    </Route>

    {/* Note how these two routes are ordered. The more specific
        path="/contact/:id" comes before path="/contact" so that
        route will render when viewing an individual contact */}

    {/*<Route path="/contact/:id">
      <Contact />
    </Route>
    <Route path="/contact">
      <AllContacts />
    </Route>*/}

    {/* If none of the previous routes render anything,
        this route acts as a fallback.

        Important: A route with path="/" will *always* match
        the URL because all URLs begin with a /. So that's
        why we put this one last of all */}
    <Route path="/">
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </Route>
  </Switch>
);


export default renderRoutes;
