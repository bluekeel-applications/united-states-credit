import React, { createContext, useReducer, useState } from 'react';

import { 
    initialAppState,
    appStateReducer
} from './reducers/appReducer';
import { 
    initialTrackingState,
    trackingStateReducer
} from './reducers/trackingReducer';
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const AppContext = createContext();

function AppContextProvider({ children }) {
    // Container Height
    const [contentHeight, setContentHeight] = useState(0);
    // Application State Management
    const [appState, dispatchApp] = useReducer(appStateReducer, initialAppState);
    const [trackingState, dispatchTracking] = useReducer(trackingStateReducer, initialTrackingState);
    
    const defaultContext = {
        appState, 
        dispatchApp,
        trackingState, 
        dispatchTracking,
        contentHeight, 
        setContentHeight,
        CORS_PROXY
    };

    return (
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };