import React, { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import { useUser } from './UserContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  redirect,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import 'tailwindcss/tailwind.css';

import './App.css';
import Home from './pages/Home';
import Area from './pages/Area';
import TaskList from './pages/TaskList';
import NavBar from './components/NavBar';
import EditTaskModal from './components/Tasks/EditTaskModal';

const PageProperties = ({ component: Component }) => {
  const { selectedUser, users } = useUser();
  const user = users.find((u) => u.username === selectedUser);
  const userColor = user ? user.color : 'rgba(0, 0, 0, 1)'; // Default color
  console.log('selected user is', selectedUser);

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
  const { selectedUser } = useUser();
  const navigate = useNavigate();

  const selectedItem = {
    title: 'Sample Title',
    description: 'Sample Description',
    addedBy: 'Sample User',
  };

  useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [selectedUser, navigate]);

  return (
    <div>
      {' '}
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/area" element={<PageProperties component={<Area />} />} />
        <Route
          path="/tasklist/:value"
          element={<PageProperties component={<TaskList />} />}
        />
      </Routes>{' '}
    </div>
  );
};

// <div>
{
  /* <EditTaskModal isOpen={true} selectedItem={selectedItem} /> */
}
{
  /* <AddTaskModal /> */
}
{
  /* <TaskList areaButtonValue="mainHouse" /> */
}
{
  /* {pages[activePage]} */
}
// </div>
