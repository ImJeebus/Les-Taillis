import React, { useState } from 'react';
import './Profile.css';
import { useUser } from '../../UserContext';

const Profile = () => {
  const { selectedUser, users } = useUser();
  const selectedUserColor = users.find(
    (user) => user.value === selectedUser
  )?.color;
  const selectedUserText = users.find(
    (user) => user.value === selectedUser
  )?.text;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  console.log('isprofopen', isProfileModalOpen);

  return (
    <div className="profileContainer">
      <button
        className={`profileBubble ${
          isProfileModalOpen ? 'expandBubbleAnimation' : 'profileBubble'
        }`}
        style={{
          backgroundColor: selectedUserColor,
        }}
        onClick={() => setIsProfileModalOpen(true)}
      >
        {selectedUser && <span>{selectedUserText}</span>}
      </button>
      <button className="editProfileModalClose">Close</button>
    </div>
  );
};

export default Profile;
