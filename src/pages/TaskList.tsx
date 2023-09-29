import React, { useState, useEffect } from 'react';
import './TaskList.css';
import AddTaskModal from './../components/Tasks/AddTaskModal';
import EditTaskModal from './../components/Tasks/EditTaskModal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { firestore } from './../firebase';
import { Link, useParams } from 'react-router-dom';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { useUser } from '../UserContext';
import NavBar from '../components/NavBar';

const TaskList = () => {
  const { selectedUser, users } = useUser();
  const selectedUserText = users.find(
    (user) => user.value === selectedUser
  )?.text;
  const { value } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const Titles = {
    mainHouse: 'Main House',
    pidge: 'Pidge',
    barn: 'Barn',
    poolArea: 'Pool Area',
    marketing: 'Marketing',
    adminLegal: 'Admin / Legal',
    allTasks: 'All Tasks',
  };

  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');
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
    if (title.trim() !== '') {
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

      setNewItem('');
      setNewDescription('');
    }
  };

  const removeItem = async (index) => {
    const itemToRemove = taskList[index];

    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'tasks', value, value)
      );

      const matchingDocs = querySnapshot.docs.filter(
        (doc) =>
          doc.data().title === itemToRemove.title &&
          doc.data().description === itemToRemove.description &&
          doc.id === itemToRemove.id
      );

      if (matchingDocs.length > 0) {
        const docToDelete = matchingDocs[0];
        await deleteDoc(
          doc(firestore, ...docToDelete._key.path.segments.slice(5))
        );
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="taskContainer">
        <h1>{Titles[value]}</h1>
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
