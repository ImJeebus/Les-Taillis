import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const navigate = useNavigate();
  const [buttonPosition, setButtonPosition] = useState({}); // Track button position

  // Use useRef to store initial button positions
  const buttonPositionsRef = useRef({});

  // Calculate and store initial button positions when component mounts
  useEffect(() => {
    users.forEach((user) => {
      const button = document.querySelector(`.${user.value}Button`);
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        console.log(user, 'button rect', buttonRect);
        buttonPositionsRef.current[user.value] = {
          top: buttonRect.top - 100,
          left: buttonRect.left - 5,
        };
      }
    });
  }, [users]);

  const handleUserClick = (user) => {
    setSelectedUser(user.value);
    setClickedUser(user.value);

    // Calculate the new position (center of the screen)
    const finalPosition = {
      top: window.innerHeight / 2 - 50, // Centered vertically
      left: window.innerWidth / 2 - 50, // Centered horizontally
    };

    // Set the button's final position
    setButtonPosition(finalPosition);

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
