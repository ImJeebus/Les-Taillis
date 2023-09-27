import React from 'react';
import './Profile.css';
import { useUser } from '../UserContext';

const Profile = () => {
  const { selectedUser, users } = useUser();
  const selectedUserColor = users.find(
    (user) => user.value === selectedUser
  )?.color;
  const selectedUserText = users.find(
    (user) => user.value === selectedUser
  )?.text;

  const clickProfileButton = () => {};

  return (
    <div className="profileContainer">
      <button
        className="profileBubble"
        style={{
          backgroundColor: selectedUserColor,
        }}
        onClick={clickProfileButton()}
      >
        {selectedUser && <span>{selectedUserText}</span>}
      </button>
    </div>
  );
};

export default Profile;
