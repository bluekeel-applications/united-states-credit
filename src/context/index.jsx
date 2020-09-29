import React, { createContext, useReducer } from 'react';

import { initialAppState, appStateReducer } from './reducers/appReducer';
import { initialTrackingState, trackingStateReducer } from './reducers/trackingReducer';

const AppContext = createContext();

function AppContextProvider({ children }) {
    // Application State Management
    const [appState, dispatchApp] = useReducer(appStateReducer, initialAppState);
    const [trackingState, dispatchTracking] = useReducer(trackingStateReducer, initialTrackingState);
    
    const defaultContext = {
        appState, 
        dispatchApp,
        trackingState, 
        dispatchTracking
    };

    return (
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };