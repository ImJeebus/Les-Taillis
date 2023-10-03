import { useReducer } from 'react';

const initialState = {
  username: '',
  text: '',
  color: '',
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
