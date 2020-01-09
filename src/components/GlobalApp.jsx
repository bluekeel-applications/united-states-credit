import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from '../context';

// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const GlobalApp = () => (
  <Router>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Router>
);


export default GlobalApp;
