import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Form, Portfolio, Transactions, Logout, FourOhFour } from './components';

const Routes = props => (
  <Switch>
    {props.userExists ? (
        <React.Fragment>
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/transactions' component={Transactions} />
          <Route path='/logout' component={Logout} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route path='/login' render={props => <Form {...props} type='Log In' />} />
          <Route path='/signup' render={props => <Form {...props} type='Sign Up' />} />
        </React.Fragment>
      )
    }
    <Route component={FourOhFour} />
  </Switch>
);

const mapStateToProps = state => {
  return {
    userExists: !!state.user.email
  };
};

export default connect(mapStateToProps)(Routes);
