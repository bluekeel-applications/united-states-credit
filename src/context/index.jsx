import React, { createContext, useReducer, useState } from 'react';

import { initialAppState, appStateReducer } from './reducers/appReducer';
import { initialTrackingState, trackingStateReducer } from './reducers/trackingReducer';
import { initialFeedState, feedStateReducer } from './reducers/feedReducer';

const AppContext = createContext();

function AppContextProvider({ children }) {
    // Container Height
    const [contentHeight, setContentHeight] = useState(0);
    // Application State Management
    const [appState, dispatchApp] = useReducer(appStateReducer, initialAppState);
    const [trackingState, dispatchTracking] = useReducer(trackingStateReducer, initialTrackingState);
    const [feedState, dispatchFeed] = useReducer(feedStateReducer, initialFeedState);
    
    const defaultContext = {
        appState, 
        dispatchApp,
        trackingState, 
        dispatchTracking,
        feedState, 
        dispatchFeed,
        contentHeight, 
        setContentHeight
    };

    return (
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };