import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Form, Portfolio, Transactions } from './components';

const Routes = () => (
  <Switch>
    <Route path='/portfolio' component={Portfolio} />
    <Route path='/transactions' component={Transactions} />
    <Route path='/login' render={props => <Form {...props} type='Log In' />} />
    <Route render={props => <Form {...props} type='Sign Up' />} />
  </Switch>
);

export default Routes;
