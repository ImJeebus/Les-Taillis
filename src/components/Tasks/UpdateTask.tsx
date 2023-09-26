import React, { useState, useEffect } from 'react';
import './UpdateTask.css';

const UpdateTask = () => {
  return (
    <div className="updateTaskContainer">
      <div className="updateTaskTitle">Updates</div>
      <input
        type="text"
        className="inputTaskUpdate"
        placeholder="Add an update..."
        // value={newItem}
        // onChange={(e) => setNewItem(e.target.value)}
      />
    </div>
  );
};

export default UpdateTask;
