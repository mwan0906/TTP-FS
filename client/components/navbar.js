import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = props => {
  return (
    <div>
      {props.userExists && (
        <React.Fragment>
          <NavLink to='/portfolio'>Portfolio</NavLink> ||{' '}
          <NavLink to='/transactions'>Transactions</NavLink>
          <NavLink to='/logout'>Log Out</NavLink>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userExists: !!state.user.email
  };
};

export default connect(mapStateToProps)(NavBar);
