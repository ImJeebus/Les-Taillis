import React, { useState } from 'react';
import { UserProvider } from './UserContext';
import { useUser } from './UserContext';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

import './App.css';
import Home from './pages/Home';
import Area from './pages/Area';
import TaskList from './pages/TaskList';
import NavBar from './components/NavBar';

const PageProperties = ({ component: Component }) => {
  const { selectedUser, users } = useUser();
  const user = users.find((u) => u.value === selectedUser);
  const userColor = user ? user.color : 'rgba(80, 187, 251, 1)'; // Default color

  return (
    <div
      className="PageProperties"
      style={{
        background: `linear-gradient(0deg, ${userColor} 0%, rgba(255, 255, 255, 1) 100%)`,
      }}
    >
      {Component}
    </div>
  );
};

export const App = () => {
  // const selectedItem = {
  //   title: 'Sample Title',
  //   description: 'Sample Description',
  //   addedBy: 'Sample User',
  // };

  return (
    <UserProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/area"
            element={<PageProperties component={<Area />} />}
          />
          <Route
            path="/tasklist/:value"
            element={<PageProperties component={<TaskList />} />}
          />
        </Routes>

        <div>
          {/* <EditTaskModal isOpen={true} selectedItem={selectedItem} /> */}
          {/* <AddTaskModal /> */}
          {/* <TaskList areaButtonValue="mainHouse" /> */}
          {/* {pages[activePage]} */}
        </div>
      </Router>
    </UserProvider>
  );
};
