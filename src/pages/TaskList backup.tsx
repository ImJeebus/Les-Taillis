import React, { useState, useEffect } from 'react';
import './TaskList.css';

const TaskList = ({ areaButtonValue }) => {
  const Titles = {
    mainHouse: 'Main House',
    pidge: 'Pidge',
    barn: 'Barn',
    poolArea: 'Pool Area',
  };

  const [itemsDict, setItemsDict] = useState({}); // Initialize itemsDict as an empty object
  const [newItem, setNewItem] = useState(''); // State to hold the new item

  // Function to handle adding a new item to the array
  const addItem = () => {
    if (newItem.trim() !== '') {
      const currentItems = itemsDict[areaButtonValue] || []; // Check if the array exists
      const updatedItems = [...currentItems, newItem];
      const updatedDict = { ...itemsDict, [areaButtonValue]: updatedItems };
      setItemsDict(updatedDict);
      localStorage.setItem('itemsDict', JSON.stringify(updatedDict)); // Save to localStorage
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const currentItems = itemsDict[areaButtonValue] || []; // Check if the array exists
    const updatedItems = [...currentItems];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    const updatedDict = { ...itemsDict, [areaButtonValue]: updatedItems };
    setItemsDict(updatedDict);
    localStorage.setItem('itemsDict', JSON.stringify(updatedDict));
  };

  // Load items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('itemsDict');
    if (storedItems) {
      setItemsDict(JSON.parse(storedItems));
    }
  }, []);

  return (
    <div className="taskContainer">
      <h1>{Titles[areaButtonValue]}</h1>
      <div className="createTask">
        <button className="createTaskButton">Add Task</button>
      </div>
      <div className="taskList">
        <div>
          <input
            type="text"
            placeholder="Enter an item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <ul>
          {(itemsDict[areaButtonValue] || []).map(
            (
              item,
              index // Check if the array exists
            ) => (
              <li key={index}>
                {item}
                <button onClick={() => removeItem(index)}>Remove</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
