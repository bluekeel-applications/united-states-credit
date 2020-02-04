import { useEffect, useContext, useRef, useState } from 'react';
import { AppContext } from '../context';
import { getUserLocation } from '../utils/middleware';

const useGeoLocation = () => {
    const componentIsMounted = useRef(true);
    const [error, setError] = useState(false);
    const { dispatchTracking } = useContext(AppContext);
    const retry_count = useRef(3);

    const getLocation = async () => {
        const res = await getUserLocation();
        if(res.status === 'failed' && retry_count.current > 0) {
            retry_count.current--;
            getLocation();
            return;
        }
        if(res.status === 'failed' && retry_count.current === 0){
            setError(true);
            return;
        };
        dispatchTracking({ type: 'LOCATION_FOUND', payload: res.state})
    };

    useEffect(() => {
        if(componentIsMounted.current) {getLocation();}
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
    return [error]
};

export default useGeoLocation;