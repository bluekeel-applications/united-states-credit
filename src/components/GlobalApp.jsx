import React from 'react';

import App from './App';
import { AppContextProvider } from '../context';

// fontawesome
import initFontAwesome from '../utils/initFontAwesome';
initFontAwesome();

const GlobalApp = () => (
    <AppContextProvider>
      <App />
    </AppContextProvider>
);


export default GlobalApp;
