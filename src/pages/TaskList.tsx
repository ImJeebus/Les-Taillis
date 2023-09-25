import React, { useState, useEffect } from 'react';
import './TaskList.css';
import AddTaskModal from './../components/Tasks/AddTaskModal';
import EditTaskModal from './../components/Tasks/EditTaskModal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { firestore } from './../firebase';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

const TaskList = ({ areaButtonValue, userValue }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = ({ item, index }) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const Titles = {
    mainHouse: 'Main House',
    pidge: 'Pidge',
    barn: 'Barn',
    poolArea: 'Pool Area',
    marketing: 'Marketing',
    adminLegal: 'Admin / Legal',
    allTasks: 'All Tasks',
  };

  const [itemsDict, setItemsDict] = useState({});
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'tasks', areaButtonValue, areaButtonValue)
      );
      const data = querySnapshot.docs.map((doc) => doc.data());

      const areaItems = data || [];
      const updatedAreaItems = areaItems.map((item) => {
        return {
          ...item,
        };
      });
      const updatedDict = {
        ...itemsDict,
        [areaButtonValue]: updatedAreaItems,
      };
      setItemsDict(updatedDict);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [areaButtonValue]);

  const addItem = async ({ title, description }) => {
    if (title.trim() !== '') {
      // add to firestore
      try {
        await addDoc(
          collection(firestore, 'tasks', areaButtonValue, areaButtonValue),
          {
            title: title,
            description: description,
            addedBy: userValue,
          }
        );
        fetchData();
      } catch (error) {
        console.log(error);
      }

      setNewItem('');
      setNewDescription('');
    }
  };

  const removeItem = async (index) => {
    const currentItems = itemsDict[areaButtonValue] || [];
    const itemToRemove = currentItems[index];
    console.log('curr indec', currentItems[index]);
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'tasks', areaButtonValue, areaButtonValue)
      );
      const matchingDocs = querySnapshot.docs.filter(
        (doc) =>
          doc.data().title === itemToRemove.title &&
          doc.data().description === itemToRemove.description
      );
      console.log('matchdoc', matchingDocs);
      if (matchingDocs.length > 0) {
        const docToDelete = matchingDocs[0];
        await deleteDoc(
          doc(
            firestore,
            docToDelete._key.path.segments[5],
            docToDelete._key.path.segments[6],
            docToDelete._key.path.segments[7],
            docToDelete._key.path.segments[8]
          )
        );
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="taskContainer">
      <h1>{Titles[areaButtonValue]}</h1>
      <div className="createTask">
        <button className="createTaskButton" onClick={openAddModal}>
          {
            <AiOutlinePlusCircle
              style={{ fontSize: '32px', marginRight: '10px' }}
            />
          }
          Add New Task
        </button>
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          areaButtonValue={areaButtonValue}
          addItem={addItem}
          newItem={newItem}
          setNewItem={setNewItem}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
        />
      </div>
      <div className="taskListContainer">
        <ul className="taskListSection">
          {(itemsDict[areaButtonValue] || []).map((item, index) => (
            <li className="taskList" key={index}>
              {/* <div className="taskBox"> */}
              <button
                className="taskDetails"
                onClick={() => openEditModal({ item, index })}
              >
                {/* <input
                  className="taskCheckbox"
                  type="checkbox"
                  checked={item.checked}
                  // onChange={() => handleCheckboxChange(item)}
                /> */}
                <strong>{item.title}</strong> - {item.description}
              </button>
              <button
                className="removeTaskButton"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
              {/* </div> */}
            </li>
          ))}
        </ul>
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          removeItem={removeItem}
          selectedItem={selectedItem}
          selectedIndex={selectedIndex}
          // selectedTaskID
        />
      </div>
    </div>
  );
};

export default TaskList;
