import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="editProfileModalOverlay">
      <button className="editProfileModalClose" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default EditProfileModal;
