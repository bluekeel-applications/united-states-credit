import { createContext } from 'react';

// The app-wide context object on its own, so a module can subscribe to it
// (useContext) without loading the reducers — which read document.cookie the
// moment they are imported — or the provider. index.jsx re-exports it, so
// the live app is unchanged; the compliance snapshot's build-time render
// (scripts/compliance-snapshot) imports it from here and supplies its own
// provider value.
export const AppContext = createContext();
