import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = props => {
    return (<div>
        <NavLink to='/test'>Test</NavLink> || <NavLink to='test2'>Other Link</NavLink>
    </div>);
};

export default NavBar;