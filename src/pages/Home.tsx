import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const [buttonPositions, setButtonPositions] = useState({}); // Track button positions
  const navigate = useNavigate();

  // Function to calculate initial button positions
  const calculateInitialButtonPositions = () => {
    const positions = {};
    users.forEach((user) => {
      const button = document.querySelector(`.${user.value}Button`);
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        positions[user.value] = { top: buttonRect.top, left: buttonRect.left };
      }
    });
    return positions;
  };

  // Set initial button positions
  useEffect(() => {
    const initialPositions = calculateInitialButtonPositions();
    setButtonPositions(initialPositions);
  }, [users]);

  const handleUserClick = (user) => {
    setSelectedUser(user.value);
    setClickedUser(user.value);

    // get position of button
    const initialButton = document.querySelector(`.${user.value}Button`);
    const buttonRect = initialButton.getBoundingClientRect();

    // Calculate the end position (destination: top center of screen)
    const centerX = window.innerWidth / 2 - buttonRect.width / 2 - 2.5;
    const centerY = 15;

    // Update the button's position
    setButtonPositions({
      ...buttonPositions,
      [user.value]: { top: centerY, left: centerX },
    });

    // Navigate after delay
    setTimeout(() => {
      navigate('/area');
    }, 1500);
  };

  return (
    <div className="homeContainer">
      {clickedUser ? null : <h1>Les Taillis</h1>}
      <div className={'buttonContainer'}>
        <div className={'buttonGrid'}>
          {users.map((user) => (
            <Link
              key={user.value}
              className={`homeButton ${user.value}Button ${
                !clickedUser
                  ? ''
                  : clickedUser === user.value
                  ? 'centered'
                  : `hidden`
              }`}
              onClick={() => handleUserClick(user)}
              style={{
                backgroundColor: user.color,
                ...buttonPositions[user.value],
              }}
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
