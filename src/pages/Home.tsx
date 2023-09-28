import React, { useState } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser(user.value);
    setClickedUser(user.value);
    setTimeout(() => {
      navigate('/area');
    }, 2000);
  };

  return (
    <div className="homeContainer">
      {clickedUser ? null : <h1>Les Taillis</h1>}
      <div className={`buttonContainer ${clickedUser ? 'hidden' : ''}`}>
        <div className="buttonGrid">
          {users.map((user) => (
            <Link
              key={user.value}
              // to={`/area`}
              className={`homeButton ${user.value}Button`}
              onClick={() => handleUserClick(user)}
              style={{ backgroundColor: user.color }}
            >
              {user.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
