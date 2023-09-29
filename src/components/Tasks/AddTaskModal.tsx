import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, addItem }) => {
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      addItem({ title: newItem, description: newDescription });
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
          id="title"
          className="inputTitle"
          placeholder="Enter Title"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        Description
        <input
          type="text"
          id="description"
          className="inputDescription"
          placeholder="Enter Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className="addItemButton" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <button className="addTaskModalCloseButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AddTaskModal;
