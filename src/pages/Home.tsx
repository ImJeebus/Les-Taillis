import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const MARGIN_PADDING = 15;

const Home = () => {
  // const { setSelectedUser, users } = useUser();
  const [clickedUser, setClickedUser] = useState(null);
  const [buttonPositions, setButtonPositions] = useState({}); // Track button positions
  const navigate = useNavigate();

  const { userState, userDispatch } = useUser();
  const { users } = userState;

  // Create refs for buttons
  const buttonRefs = useRef({});
  users.forEach((user) => {
    buttonRefs.current[user.username] = useRef(null);
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
      const button = buttonRefs.current[user.username].current;
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        positions[user.username] = {
          top: buttonRect.top,
          left: buttonRect.left,
        };
      }
    });
    console.log('initial positions', positions);
    return positions;
  };

  const handleUserClick = (user) => {
    // setSelectedUser(user.username);

    userDispatch({ type: 'UPDATE_USERNAME', payload: user.username });

    setClickedUser(user.username);

    // get the initial position of the button
    const initialPosition = buttonPositions[user.username];

    // Calculate the end position (destination: top center of screen)
    const centerX = window.innerWidth / 2 - 55;
    const centerY = MARGIN_PADDING;

    // Update the button's position
    setButtonPositions({
      ...buttonPositions,
      [user.username]: { top: centerY, left: centerX },
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
    return user.username === 'eddie';
  });
  console.log('find example', findExample.color);

  const filterExample = users
    .filter((user) => {
      return user.username === 'eddie';
    })
    .map((filteredUser) => {
      return filteredUser.color;
    });
  console.log('filter example', filterExample);

  const filterExampleAsMap = users.map((user) => {
    return user.username === 'eddie' && user.color;
  });
  console.log('filter 2 example', filterExampleAsMap);

  const reduceExample = users.reduce((acc, user) => {
    if (user.username === 'eddie') {
      return [acc, user.color];
    } else {
      return acc;
    }
  }, []);
  console.log('reduce example', reduceExample);

  // can write reduces a for loops (in (index) vs of (object))

  const acc = [];
  for (const user of users) {
    if (user.username === 'eddie') {
      acc.push(user.color);
    }
    // console.log('for user', user);
  }
  console.log('for acc is', acc);

  const exampleUser = users[0];
  console.log('object keys', Object.keys(exampleUser));
  // console.log("object values", Object.values(exampleUser))

  const exUser = Object.keys(exampleUser).reduce((acc, userKey) => {
    const value = exampleUser[userKey];
    return {
      ...acc,
      [userKey]: value,
    };
  }, {});
  console.log('ex user', exUser);

  const nameKey = 'name';

  const myObj = {
    [nameKey]: 'eddie',
    age: 30,
  };

  return (
    <div className="homeContainer">
      {clickedUser ? null : <h1>Les Taillis</h1>}
      <div className={'buttonContainer'}>
        <div className={'buttonGrid'}>
          {users.map((user) => (
            <Link
              key={user.username}
              ref={buttonRefs.current[user.username]}
              className={`homeButton ${user.username}Button ${
                !clickedUser
                  ? ''
                  : clickedUser === user.username
                  ? 'centered'
                  : `hidden`
              }`}
              onClick={() => handleUserClick(user)}
              style={{
                backgroundColor: user.color,
                ...buttonPositions[user.username],
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
