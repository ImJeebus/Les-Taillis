import React, { useState } from 'react';
import './NavBar.css';
import { BiHomeAlt, BiBorderNone, BiTask } from 'react-icons/bi';
import Profile from './Profiles/Profile';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navBarContainer">
      {/* {location.pathname !== '/' && location.pathname !== '/area' && (
        <Link to="/" className="navBarHome">
          <BiHomeAlt />
        </Link>
      )} */}
      {location.pathname !== '/' && location.pathname !== '/area' && (
        <Link to="/area" className="navBarArea">
          <BiBorderNone />
        </Link>
      )}
      {location.pathname !== '/' && (
        <div className="userProfile">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default NavBar;
