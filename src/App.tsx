import React, { useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import styles from './App.module.css';
import 'tailwindcss/tailwind.css';

import './style.css';
import Home from './pages/Home';
import Area from './pages/Area';
import TaskList from './pages/TaskList';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import AddTaskModal from './components/Tasks/AddTaskModal';
import EditTaskModal from './components/Tasks/EditTaskModal';

import NewPageTest from './pages/NewPageTest';

export const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [userValue, setUserValue] = useState(null);
  const [areaButtonValue, setAreaButtonValue] = useState(null);
  const [profileColour, setProfileColour] = useState(null);

  const handleUserButton = (value, colour) => {
    setUserValue(value);
    setActivePage('area');
    setProfileColour(colour);
  };

  const handleAreaButtonClick = (value) => {
    setAreaButtonValue(value);
    setActivePage('taskList');
  };

  console.log('User Value is:', userValue);

  const pages = {
    home: <Home handleUserButton={handleUserButton} />,
    // home: <Home />,
    area: <Area handleAreaButtonClick={handleAreaButtonClick} />,
    taskList: (
      <TaskList areaButtonValue={areaButtonValue} userValue={userValue} />
    ),
  };

  const selectedItem = {
    title: 'Sample Title',
    description: 'Sample Description',
    addedBy: 'Sample User',
  };

  return (
    // <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home handleUserButton={handleUserButton}  />} />
        <Route path="/newpagetest" element={<NewPageTest />} />
      </Routes>
      <div>
        {/* <EditTaskModal isOpen={true} selectedItem={selectedItem} /> */}
        {/* <AddTaskModal /> */}
        {/* <TaskList areaButtonValue="mainHouse" /> */}
        <NavBar
          activePage={activePage}
          setActivePage={setActivePage}
          userValue={userValue}
          profileColour={profileColour}
        />
        {/* {pages[activePage]} */}
        <div>
          <button>
            <Link to="/newpagetest">NEWPAGE</Link>
          </button>
        </div>
      </div>
    </Router>
    // </UserProvider>
  );
};
