import React, { useState } from 'react';
import './Profile.css';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
              <button
                className="profileLogoutButton"
                onClick={() => {
                  navigate('/');
                }}
              >
                Logout
              </button>
              <button className="profileCloseButton" onClick={handleClosedClick}>
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
