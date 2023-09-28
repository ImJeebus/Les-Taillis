import React, { useState } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const navigate = useNavigate();
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 }); // Track button position

  const handleUserClick = (user) => {
    setSelectedUser(user.value);
    setClickedUser(user.value);

    // Get the button's position before moving it
    const button = document.querySelector(`.${user.value}Button`);
    const buttonRect = button.getBoundingClientRect();

    // Calculate the new position (center of the screen)
    const centerX = window.innerWidth / 2 - buttonRect.width / 2;
    const centerY = window.innerHeight / 2 - buttonRect.height / 2;

    // Update the button's position
    setButtonPosition({ top: centerY, left: centerX });

    setTimeout(() => {
      navigate('/area');
    }, 2000);
  };

  console.log('clicked user', clickedUser);
  return (
    <div className="homeContainer">
      {clickedUser ? null : <h1>Les Taillis</h1>}
      <div className={'buttonContainer'}>
        <div className={'buttonGrid'}>
          {users.map((user) => (
            <Link
              key={user.value}
              // to={`/area`}
              className={`homeButton ${user.value}Button ${
                !clickedUser
                  ? ''
                  : clickedUser === user.value
                  ? 'centered'
                  : `hidden`
              }`}
              onClick={() => handleUserClick(user)}
              style={{ backgroundColor: user.color, ...buttonPosition }}
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
