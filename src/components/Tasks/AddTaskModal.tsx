import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({
  isOpen,
  onClose,
  addItem,
  newItem,
  setNewItem,
  newDescription,
  setNewDescription,
}) => {
  const handleAddItem = () => {
    if (newItem.trim() !== '' /* && newDescription.trim() !== '' */) {
      addItem({ title: newItem, description: newDescription }); // Pass an object with title and description
      setNewItem('');
      setNewDescription('');
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="addTaskModalOverlay">
      <div className="addTaskModalContent">
        Task
        <input
          type="text"
          className="inputTitle"
          placeholder="Enter Title"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        Description
        <input
          type="textarea"
          className="inputDescription"
          placeholder={'Enter Description'}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className="addItemButton" onClick={handleAddItem}>
          Add Item
        </button>{' '}
      </div>
      <button className="addTaskModalCloseButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AddTaskModal;
