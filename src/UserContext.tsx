import React, { createContext, useContext, useState } from 'react';

// HOMEWORK: change User Context to useReducer Hook

// Define the user data type
interface User {
  username: string;
  text: string;
  color: string;
}

// Create the context
const UserContext = createContext<any>(null);

// Create the context provider
export const UserProvider: React.FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const users: User[] = [
    { username: 'eddie', text: 'Eddie', color: 'lightblue' },
    { username: 'lucia', text: 'Lucia', color: 'lightskyblue' },
    { username: 'gma', text: 'Gma', color: 'lightgreen' },
    { username: 'sarah', text: 'Sarah', color: 'lightpink' },
    { username: 'lino', text: 'Lino', color: 'lightseagreen' },
    { username: 'elisa', text: 'Elisa', color: 'lightsalmon' },
  ];

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
