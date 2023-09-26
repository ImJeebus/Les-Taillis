import React, { useState, useEffect } from 'react';
import './UpdateTask.css';

const UpdateTask = () => {
  const [newUpdate, setNewUpdate] = useState();

  const handleUpdateTask = () => {
    if (newUpdate.trim() !== '') {
      addUpdate({ update: newUpdate });
      // setNewItem('');
      // setNewDescription('');
    }
  };

  return (
    <div className="updateTaskContainer">
      <div className="updateTaskTitle">Updates</div>
      <div className="updateTaskAddUpdate">
        <input
          type="text"
          className="inputTaskUpdate"
          placeholder="Add an update..."
          value={newUpdate}
          // onChange={(e) => setNewUpdate(e.target.value)}
        />
        <button
          className="updateTaskAddUpdateButton"
          onClick={handleUpdateTask}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;

// when type update and press enter/add button
// update should be stored in firestore database
// re render the edit task screen
// list the updates for that task on screen
