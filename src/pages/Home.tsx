import React, { useState } from 'react';
import './Home.css';
import { useUser } from '../UserContext';

const Home = ({ handleUserButton }) => {
  return (
    <div>
      <h1>Les Taillis</h1>
      <div className="buttonContainer">
        <div className="buttonRow">
          <button
            id="homeButton"
            className="eddieButton"
            onClick={() => handleUserButton('eddie', 'lightblue')}
          >
            Eddie
          </button>
          <button
            id="homeButton"
            className="luciaButton"
            onClick={() => handleUserButton('lucia', 'lightskyblue')}
          >
            Lucia
          </button>
        </div>
        <div className="buttonRow">
          <button
            id="homeButton"
            className="gmaButton"
            onClick={() => handleUserButton('gma', 'lightgreen')}
          >
            Gma
          </button>
          <button
            id="homeButton"
            className="sarahButton"
            onClick={() => handleUserButton('sarah', 'lightpink')}
          >
            Sarah
          </button>
        </div>
        <div className="buttonRow">
          <button
            id="homeButton"
            className="linoButton"
            onClick={() => handleUserButton('lino', 'lightseagreen')}
          >
            Lino
          </button>
          <button
            id="homeButton"
            className="elisaButton"
            onClick={() => handleUserButton('elisa', 'lightsalmon')}
          >
            Elisa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
