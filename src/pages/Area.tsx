import { useState } from 'react';
import './Area.css';

const Area = ({ handleAreaButtonClick }) => {
  return (
    <div>
      <div className="areaContainer">
        <div className="areaRow">
          <button
            id="areaButton"
            className="areaAllTasks"
            onClick={() => handleAreaButtonClick('allTasks')}
          >
            All Tasks
          </button>
        </div>
        <div className="areaRow">
          <button
            id="areaButton"
            className="areaAllTasks"
            onClick={() => handleAreaButtonClick('adminLegal')}
          >
            Admin / Legal
          </button>
          <button
            id="areaButton"
            className="areaMarketing"
            onClick={() => handleAreaButtonClick('marketing')}
          >
            Marketing
          </button>
        </div>
        <div className="areaRow">
          <button
            id="areaButton"
            className="areaMainHouse"
            onClick={() => handleAreaButtonClick('mainHouse')}
          >
            Main House
          </button>
          <button
            id="areaButton"
            className="areaPidge"
            onClick={() => handleAreaButtonClick('pidge')}
          >
            Pidge
            <div className="areaButtonStatus">Status: 50%</div>
          </button>
        </div>
        <div className="areaRow">
          <button
            id="areaButton"
            className="areaBarn"
            onClick={() => handleAreaButtonClick('barn')}
          >
            Barn
          </button>
          <button
            id="areaButton"
            className="areaPoolArea"
            onClick={() => handleAreaButtonClick('poolArea')}
          >
            Pool Area
          </button>
        </div>
      </div>
    </div>
  );
};

export default Area;
