import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './UserContext';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component


const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Router>
    <UserProvider>
      <App name="StackBlitz" />
    </UserProvider>
    </Router>
  </StrictMode>
);
