import React from 'react';
import './Profile.css';

const Profile = ({ userValue, profileColour }) => {
  return (
    <div className="profileContainer">
      <div className="profileBubble" style={{ backgroundColor: profileColour }}>
        {userValue}
      </div>
    </div>
  );
};

export default Profile;
