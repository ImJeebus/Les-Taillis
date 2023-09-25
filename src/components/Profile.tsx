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

  return (
    <div className="profileContainer">
      <div
        className="profileBubble"
        style={{
          backgroundColor: selectedUserColor,
        }}
      >
        {selectedUser && <span>{selectedUserText}</span>}
      </div>
    </div>
  );
};

export default Profile;
