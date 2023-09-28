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

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClosedClick = () => {
    setExpanded(false);
  };

  const profileNameClassName = expanded
    ? 'profileName profileNameExpanded'
    : 'profileName';

  return (
    <div className="profileContainer">
      <div
        className={`profileBubble ${
          expanded ? 'profileBubbleExpanded' : 'profileBubble'
        }`}
        style={{
          backgroundColor: selectedUserColor,
        }}
        onClick={expanded ? null : handleExpandClick}
      >
        {expanded ? (
          <>
            <div className={profileNameClassName}>
              {selectedUser && <span>{selectedUserText}</span>}
            </div>
            <div className="profileButtons">
              <button className="profileLogout">Logout</button>
              <button className="profileClose" onClick={handleClosedClick}>
                Close
              </button>
            </div>
          </>
        ) : (
          <div className={profileNameClassName}>
            {selectedUser && <span>{selectedUserText}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
