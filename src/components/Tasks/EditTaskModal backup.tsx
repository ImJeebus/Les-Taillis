import React from 'react';
import './EditTaskModal.css';

const EditTaskModal = ({
  isOpen,
  onClose,
  removeItem,
  selectedItem,
  selectedIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="editTaskModalOverlay">
      <div className="editTaskModalContent">
        <div>Task Title: {selectedItem.title}</div>
        <div>Task Description: {selectedItem.description}</div>
        <div>Added by: {selectedItem.addedBy}</div>
        <div className="editTaskModalButtonsContainer">
          <button id="editTaskModalButtons" className="editTaskModalCompleted">
            Completed
          </button>
          <button
            id="editTaskModalButtons"
            className="editTaskModalRemove"
            onClick={() => {
              removeItem(selectedIndex);
              onClose();
            }}
          >
            Remove
          </button>
        </div>
        <div className="editTaskModalUpdatesContainer"></div>
      </div>
      <button className="editTaskModalCloseButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default EditTaskModal;
