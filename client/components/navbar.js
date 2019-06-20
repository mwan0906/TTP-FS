import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = props => {
  return (
    <div id='nav'>
      {props.userExists && (
        <React.Fragment>
          <span className='left'>
            <NavLink to='/portfolio'>Portfolio</NavLink> ||{' '}
            <NavLink to='/transactions'>Transactions</NavLink>
          </span>
          <span className='right'>
            <NavLink to='/logout'>Log Out</NavLink>
          </span>
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
