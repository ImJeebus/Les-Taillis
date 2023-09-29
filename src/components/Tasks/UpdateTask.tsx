import React, { useState, useEffect } from 'react';
import './UpdateTask.css';
import { firestore } from './../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useUser } from './../../UserContext';

const UpdateTask = ({ selectedItem, selectedIndex, value }) => {
  const [newUpdate, setNewUpdate] = useState('');
  const [updates, setUpdates] = useState([]);

  const { selectedUser, users } = useUser();
  const selectedUserText = users.find(
    (user) => user.value === selectedUser
  )?.text;

  const taskID = selectedItem.id;

  const fetchUpdates = async () => {
    try {
      const updatesQuery = query(
        collection(firestore, 'tasks', value, value, taskID, 'Updates')
      );
      const updatesSnapshot = await getDocs(updatesQuery);
      const updateData = updatesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUpdates(updateData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (taskID) {
      fetchUpdates();
    }
  }, [taskID]);

  const handleUpdateTask = async () => {
    if (newUpdate.trim() !== '' && taskID) {
      try {
        await addDoc(
          collection(firestore, 'tasks', value, value, taskID, 'Updates'),
          {
            UpdateText: newUpdate,
            UpdatedBy: selectedUserText,
          }
        );

        setNewUpdate('');

        fetchUpdates();
      } catch (error) {
        console.log(error);
      }
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
          onChange={(e) => setNewUpdate(e.target.value)}
        />
        <button
          className="updateTaskAddUpdateButton"
          onClick={handleUpdateTask}
        >
          Add
        </button>
      </div>
      <div className="updateList">
        <ul className="updateListItems">
          {updates.map((update, listIndex) => (
            <li key={update.id}>
              {update.UpdatedBy}: {update.UpdateText}
              {listIndex < updates.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateTask;
