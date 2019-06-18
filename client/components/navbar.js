import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
  return (
    <div>
      <NavLink to='/login'>Test</NavLink> ||{' '}
      <NavLink to='/signup'>Other Link</NavLink>
    </div>
  );
};

export default NavBar;
