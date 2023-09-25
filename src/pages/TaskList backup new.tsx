import React, { useState, useEffect } from 'react';
import './TaskList.css';
import AddTaskModal from './../components/AddTaskModal';
import { firestore } from './../firebase';
import { doc, setDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

const TaskList = ({ areaButtonValue }) => {
  // const db = firebase.database();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Titles = {
    mainHouse: 'Main House',
    pidge: 'Pidge',
    barn: 'Barn',
    poolArea: 'Pool Area',
  };

  const [itemsDict, setItemsDict] = useState({});
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addItem = async ({ title, description }) => {
    if (title.trim() !== '') {
      const currentItems = itemsDict[areaButtonValue] || [];
      const updatedItems = [...currentItems, { title, description }];
      const updatedDict = { ...itemsDict, [areaButtonValue]: updatedItems };
      setItemsDict(updatedDict);
      localStorage.setItem('itemsDict', JSON.stringify(updatedDict));

      // add to firestore
      try {
        await addDoc(
          collection(firestore, 'tasks', areaButtonValue, areaButtonValue),
          {
            title: title,
            description: description,
          }
        );
      } catch (error) {
        console.log(error);
      }

      setNewItem('');
      setNewDescription('');
    }
  };

  const removeItem = async (index) => {
    const currentItems = itemsDict[areaButtonValue] || [];
    const updatedItems = [...currentItems];
    updatedItems.splice(index, 1);
    const updatedDict = { ...itemsDict, [areaButtonValue]: updatedItems };
    setItemsDict(updatedDict);
    localStorage.setItem('itemsDict', JSON.stringify(updatedDict));

    // remove from filestore
    try {
      await deleteDoc(
        collection(firestore, 'tasks', areaButtonValue, areaButtonValue),
        {
          title: title,
          description: description,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Use a useEffect to re-render the list when itemsDict changes
  useEffect(() => {
    const storedItems = localStorage.getItem('itemsDict');
    if (storedItems) {
      setItemsDict(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem('itemsDict');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const areaItems = parsedItems[areaButtonValue] || [];
      const updatedAreaItems = areaItems.map((item) => {
        return {
          ...item,
          checked:
            localStorage.getItem(`${areaButtonValue}_${item.title}`) === 'true',
        };
      });
      const updatedDict = {
        ...parsedItems,
        [areaButtonValue]: updatedAreaItems,
      };
      setItemsDict(updatedDict);
    }
  }, [areaButtonValue]);

  const handleCheckboxChange = (item) => {
    item.checked = !item.checked;
    localStorage.setItem(`${areaButtonValue}_${item.title}`, item.checked);
    const updatedDict = { ...itemsDict };
    setItemsDict(updatedDict);
    localStorage.setItem('itemsDict', JSON.stringify(updatedDict));
  };

  return (
    <div className="taskContainer">
      <h1>{Titles[areaButtonValue]}</h1>
      <div className="createTask">
        <button className="createTaskButton" onClick={openModal}>
          Add New Task
        </button>
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          areaButtonValue={areaButtonValue}
          addItem={addItem}
          newItem={newItem}
          setNewItem={setNewItem}
          newDescription={newDescription} // Pass newDescription and setNewDescription
          setNewDescription={setNewDescription}
        />
      </div>
      <div className="taskListContainer">
        <ul className="taskListSection">
          {(itemsDict[areaButtonValue] || []).map((item, index) => (
            <li className="taskList" key={index}>
              <input
                className="taskCheckbox"
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item)}
              />
              <div className="taskDetails">
                <strong>{item.title}</strong> - {item.description}
              </div>
              <button
                className="removeTaskButton"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
