import React, { createContext, useContext, useState } from 'react';

// HOMEWORK: change User Context to useReducer Hook

// Define the user data type
interface User {
  value: string;
  text: string;
  color: string;
}

// Create the context
const UserContext = createContext<any>(null);

// Create the context provider
export const UserProvider: React.FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const users: User[] = [
    { value: 'eddie', text: 'Eddie', color: 'lightblue' },
    { value: 'lucia', text: 'Lucia', color: 'lightskyblue' },
    { value: 'gma', text: 'Gma', color: 'lightgreen' },
    { value: 'sarah', text: 'Sarah', color: 'lightpink' },
    { value: 'lino', text: 'Lino', color: 'lightseagreen' },
    { value: 'elisa', text: 'Elisa', color: 'lightsalmon' },
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
