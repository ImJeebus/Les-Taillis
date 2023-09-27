import React from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { setSelectedUser, users } = useUser();

  const handleUserClick = (user: User) => {
    setSelectedUser(user.value);
  };

  return (
    <div className="homeContainer">
      <h1>Les Taillis</h1>
      <div className="buttonContainer">
        <div className="buttonGrid">
          {users.map((user) => (
            <Link
              key={user.value}
              to={`/area`}
              className={`homeButton ${user.value}Button`}
              onClick={() => handleUserClick(user)}
              style={{ backgroundColor: user.color }} // Set the background color
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
