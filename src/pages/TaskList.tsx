import React, { useState, useEffect } from 'react';
import './TaskList.css';
import { useUser } from '../UserContext';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { firestore } from './../firebase';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import NavBar from '../components/NavBar';
import Profile from '../components/Profiles/Profile';
import AddTaskModal from './../components/Tasks/AddTaskModal';
import EditTaskModal from './../components/Tasks/EditTaskModal';
import { buttons } from './Area';

const TaskList = () => {
  const { selectedUser, users } = useUser();
  const selectedUserText = users.find(
    (user) => user.username === selectedUser
  )?.text;
  const { value } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const title = buttons.find((button) => button.value === value)?.text;

  const [taskList, setTaskList] = useState([]);

  const openEditModal = ({ item, index }) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsEditModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'tasks', value, value)
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  const addItem = async ({ title, description }) => {
    if (!title.length) {
      try {
        await addDoc(collection(firestore, 'tasks', value, value), {
          title: title,
          description: description,
          addedBy: selectedUserText,
        });
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeItem = async (index) => {
    const itemToRemove = taskList[index];
    try {
      await deleteDoc(doc(firestore, 'tasks', value, value, itemToRemove.id));
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className="taskContainer">
        {/* <h1>{Titles[value]}</h1> */}
        <h1>{title}</h1>
        <div className="createTask">
          <button
            className="createTaskButton"
            onClick={() => setIsAddModalOpen(true)}
          >
            <AiOutlinePlusCircle
              style={{ fontSize: '32px', marginRight: '10px' }}
            />
            Add New Task
          </button>
          <AddTaskModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            addItem={addItem}
          />
        </div>
        <div className="taskListContainer">
          <ul className="taskListSection">
            {taskList.map((item, index) => (
              <li className="taskList" key={index}>
                <button
                  className="taskDetails"
                  onClick={() => openEditModal({ item, index })}
                >
                  <strong>{item.title}</strong> - {item.description}
                </button>
                <button
                  className="removeTaskButton"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            removeItem={removeItem}
            selectedItem={selectedItem}
            selectedIndex={selectedIndex}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
