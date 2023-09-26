import React from 'react';
import './EditTaskModal.css';
import UpdateTask from './UpdateTask';

const EditTaskModal = ({
  isOpen,
  onClose,
  removeItem,
  selectedItem,
  selectedIndex,
}) => {
  if (!isOpen) return null;
  console.log('editask index', selectedIndex);
  return (
    <div className="editTaskModalOverlay">
      <div className="editTaskModalContent">
        <div className="editTaskModalSummary">
          <div className="editTaskModalTitle">{selectedItem.title}</div>
          <div className="editTaskModalDescription">{selectedItem.description}</div>
          <div className="editTaskModalAddedBy">Added by: {selectedItem.addedBy}</div>
        </div>
        <UpdateTask />
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
      </div>
      <button className="editTaskModalCloseButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default EditTaskModal;
