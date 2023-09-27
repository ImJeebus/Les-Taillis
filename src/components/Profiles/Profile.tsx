import React, { useState } from 'react';
import './Profile.css';
import { useUser } from '../UserContext';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const { selectedUser, users } = useUser();
  const selectedUserColor = users.find(
    (user) => user.value === selectedUser
  )?.color;
  const selectedUserText = users.find(
    (user) => user.value === selectedUser
  )?.text;

  const [isProfileModalOpen, setIsProfileMOdalOpen] = useState(false);

  return (
    <div className="profileContainer">
      <button
        className="profileBubble"
        style={{
          backgroundColor: selectedUserColor,
        }}
        onClick={() => setIsProfileMOdalOpen(true)}
      >
        {selectedUser && <span>{selectedUserText}</span>}
      </button>
      <EditProfileModal />
    </div>
  );
};

export default Profile;
