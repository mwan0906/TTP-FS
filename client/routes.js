import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Form, Portfolio, Transactions } from './components';

const Routes = props => (
  <Switch>
    {props.userExists && (
      <React.Fragment>
        <Route path='/portfolio' component={Portfolio} />
        <Route path='/transactions' component={Transactions} />
      </React.Fragment>
    )}
    <Route path='/login' render={props => <Form {...props} type='Log In' />} />
    <Route render={props => <Form {...props} type='Sign Up' />} />
  </Switch>
);

const mapStateToProps = state => {
  return {
    userExists: !!state.user.email
  };
};

export default connect(mapStateToProps)(Routes);
