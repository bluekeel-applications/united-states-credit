// The AdSense level the page decided on (useAdSense.jsx): 0–3 once the engine
// answered, null while deciding or on the legacy path. AdUnit renders only at
// level 1; nothing else needs it.
import { createContext, useContext } from 'react';

export const AdLevelContext = createContext(null);
export const useAdLevel = () => useContext(AdLevelContext);
