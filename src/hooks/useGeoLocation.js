import { useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context';
import { getUserLocation } from '../utils/middleware';

const useGeoLocation = () => {
    const componentIsMounted = useRef(true);
    const { dispatchTracking } = useContext(AppContext);

    useEffect(() => {
        if(componentIsMounted) {
            (async function() {                
                const userLocation = await getUserLocation();
                if(userLocation.state) {
                    dispatchTracking({ type: 'LOCATION_FOUND', payload: userLocation.state})
                }
                console.log('User location:', userLocation);
            })();    
        }
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
};

export default useGeoLocation;