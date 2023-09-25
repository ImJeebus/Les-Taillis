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

export const App = () => {
  const [userValue, setUserValue] = useState(null);
  const [profileColour, setProfileColour] = useState(null);

  const handleUserButton = (value, colour) => {
    setUserValue(value);
    setProfileColour(colour);
  };

  console.log('User Value is:', userValue);

  const selectedItem = {
    title: 'Sample Title',
    description: 'Sample Description',
    addedBy: 'Sample User',
  };

  return (
    // <UserProvider>
    <Router>
      <NavBar userValue={userValue} profileColour={profileColour} />
      <Routes>
        <Route
          path="/"
          element={<Home handleUserButton={handleUserButton} />}
        />
        <Route path="/area" element={<Area />} />
        <Route
          path="/tasklist/:value"
          element={<TaskList userValue={userValue} />}
        />
      </Routes>

      <div>
        {/* <EditTaskModal isOpen={true} selectedItem={selectedItem} /> */}
        {/* <AddTaskModal /> */}
        {/* <TaskList areaButtonValue="mainHouse" /> */}
        {/* {pages[activePage]} */}
      </div>
    </Router>
    // </UserProvider>
  );
};
