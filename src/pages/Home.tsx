import React, { useState } from 'react';
import './Home.css';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const users = [
    { value: 'eddie', text: 'Eddie' },
    { value: 'lucia', text: 'Lucia' },
    { value: 'gma', text: 'Gma' },
    { value: 'sarah', text: 'Sarah' },
    { value: 'lino', text: 'Lino' },
    { value: 'elisa', text: 'Elisa' },
  ];

  return (
    <div>
      <h1>Les Taillis</h1>
      <div className="buttonContainer">
        <div className="buttonGrid">
          {users.map(({ value, text }) => (
            <Link
              key={value}
              to={`/area`}
              className={`homeButton ${value}Button`}
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
