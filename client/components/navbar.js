import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
  return (
    <div>
      <NavLink to='/portfolio'>Portfolio</NavLink> ||{' '}
      <NavLink to='/transactions'>Transactions</NavLink>
    </div>
  );
};

export default NavBar;
