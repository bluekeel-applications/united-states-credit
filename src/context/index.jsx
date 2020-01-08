import React, { createContext, useReducer } from 'react';

import { 
    initialAppState,
    appStateReducer
} from './reducers';

const AppContext = createContext();

function AppContextProvider({ children }) {
    // Application State Management
    const [appState, dispatchApp] = useReducer(appStateReducer, initialAppState);
    
    const defaultContext = {
        appState, 
        dispatchApp
    };

    return (
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };