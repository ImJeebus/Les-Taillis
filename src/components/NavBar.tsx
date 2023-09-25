import React, { useState } from 'react';
import './NavBar.css';
import { BiHomeAlt, BiBorderNone, BiTask } from 'react-icons/bi';
import Profile from './Profile';

const NavBar = ({ activePage, setActivePage, userValue, profileColour }) => {
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="navBarContainer">
      {activePage !== 'home' && (
        <div
          className={`navBarHome${activePage === 'home' ? ' active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <BiHomeAlt />
        </div>
      )}
      {activePage !== 'home' && activePage !== 'area' && (
        <div
          className={`navBarArea${activePage === 'area' ? ' active' : ''}`}
          onClick={() => handleNavClick('area')}
        >
          <BiBorderNone />
        </div>
      )}
      {/* <div
        className={`navBarTask${activePage === 'taskList' ? ' active' : ''}`}
        onClick={() => handleNavClick('taskList')}
      >
        <BiTask />
      </div> */}
      {activePage !== 'home' && (
        <div className="userProfile">
          <Profile userValue={userValue} profileColour={profileColour} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
