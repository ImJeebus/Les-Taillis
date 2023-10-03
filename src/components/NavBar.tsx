import React, { useState } from 'react';
import './NavBar.css';
import { BiBorderNone } from 'react-icons/bi';
import Profile from './Profiles/Profile';
import { Link, useLocation } from 'react-router-dom';

// const navItems = [
//   {path: '/area', icon: <BiBorderNone />, showProfile: true }
//   {path: '/area/taskList', icon: }
// ]

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navBarContainer">
      {location.pathname !== '/' && (
        <div className="userProfile">
          <Profile />
        </div>
      )}
      {location.pathname !== '/' && location.pathname !== '/area' && (
        <Link to="/area" className="navBarArea">
          <BiBorderNone />
        </Link>
      )}
    </div>
  );
};

export default NavBar;
