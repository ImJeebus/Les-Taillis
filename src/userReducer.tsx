import { useReducer } from 'react';

const initialState = {
  users: [
    { username: 'eddie', text: 'Eddie', color: 'lightblue' },
    { username: 'lucia', text: 'Lucia', color: 'lightskyblue' },
    { username: 'gma', text: 'Gma', color: 'lightgreen' },
    { username: 'sarah', text: 'Sarah', color: 'lightpink' },
    { username: 'lino', text: 'Lino', color: 'lightseagreen' },
    { username: 'elisa', text: 'Elisa', color: 'lightsalmon' },
  ],
};

function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, name: action.payload };
    case 'UPDATE_TEXT':
      return { ...state, text: action.payload };
    case 'UPDATE_COLOR':
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

export function useUserReducer() {
  return useReducer(userReducer, initialState);
}
