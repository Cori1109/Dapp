/* eslint-disable react/display-name */
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

export const renderRoutes = (routes = []) => (
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;
        console.log('routes')


        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Component {...props} />
                )}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./pages/Login'))
},
  {
    path: '/login',
    routes: [
      {
        exact: true,
        path: '/login',
        component: lazy(() => import('./pages/Login'))
      }
    ]
  },
  {
    path: '/app',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('./pages/Login'))
      },
      {
        exact: true,
        path: '/app/calculator',
        component: lazy(() => import('./pages/Login'))
      },
      {
        exact: true,
        path: '/app/leaderboard',
        component: lazy(() => import('./pages/Login'))
      },
      {
        exact: true,
        path: '/app/staking-stats',
        component: lazy(() => import('./pages/Login'))
      },
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('./pages/Login'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
