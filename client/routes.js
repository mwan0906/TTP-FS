import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Form } from './components';

const Routes = () => (
  <Switch>
    <Route path='/signup' render={props => <Form {...props} type='Sign Up' />} />
    <Route path='/login' render={props => <Form {...props} type='Log In' />} />
  </Switch>
);

export default Routes;
