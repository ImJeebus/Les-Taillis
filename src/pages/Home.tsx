import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const [buttonPositions, setButtonPositions] = useState({}); // Track button positions
  const navigate = useNavigate();

  // Create refs for buttons
  const buttonRefs = useRef({});
  users.forEach((user) => {
    buttonRefs.current[user.value] = useRef(null);
  });

  // Store the initial button positions when the component mounts
  useEffect(() => {
    const initialPositions = calculateInitialButtonPositions();
    setButtonPositions(initialPositions);
  }, []);

  // Function to calculate initial button positions
  const calculateInitialButtonPositions = () => {
    const positions = {};
    users.forEach((user) => {
      const button = buttonRefs.current[user.value].current;
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        positions[user.value] = { top: buttonRect.top, left: buttonRect.left };
      }
    });
    console.log('initial positions', positions);
    return positions;
  };

  const handleUserClick = (user) => {
    setSelectedUser(user.value);
    setClickedUser(user.value);

    // get the initial position of the button
    const initialPosition = buttonPositions[user.value];

    // Calculate the end position (destination: top center of screen)
    const centerX = window.innerWidth / 2 - 55;
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

  // testing methods on arrays
  // find, map, filter, reduce

  const mapExample = users.map((user) => {
    return {
      ...user,
      text: user.text + 'hello',
    };
  });
  console.log('map example', mapExample);

  const findExample = users.find((user) => {
    return user.value === 'eddie';
  });
  console.log('find example', findExample.color);

  const filterExample = users
    .filter((user) => {
      return user.value === 'eddie';
    })
    .map((filteredUser) => {
      return filteredUser.color;
    });
  console.log('filter example', filterExample);

  const filterExampleAsMap = users.map((user) => {
    return user.value === 'eddie' && user.color;
  });
  console.log('filter 2 example', filterExampleAsMap);

  const reduceExample = users.reduce((acc, user) => {
    if (user.value === "eddie") {
      return [acc, user.color]
    } else {
      return acc
    }
  }, []);
  console.log('reduce example',reduceExample)

  return (
    <div className="homeContainer">
      {clickedUser ? null : <h1>Les Taillis</h1>}
      <div className={'buttonContainer'}>
        <div className={'buttonGrid'}>
          {users.map((user) => (
            <Link
              key={user.value}
              ref={buttonRefs.current[user.value]}
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
