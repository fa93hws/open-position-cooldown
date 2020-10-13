import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { createHomePage } from './home/home';
import { AboutPage } from './about/about';
import { pagePath } from '../routes';

const HomePage = createHomePage();

export const Pages = () => (
  <Switch>
    <Route exact path={pagePath.home}>
      <HomePage />
    </Route>
    <Route exact path={pagePath.about}>
      <AboutPage />
    </Route>
    <Route exact path={pagePath.notFound}>
      <h1>Not Found!</h1>
    </Route>
    <Route>
      <Redirect to={pagePath.notFound} />
    </Route>
  </Switch>
);
