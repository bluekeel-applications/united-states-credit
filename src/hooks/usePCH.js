import { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context';

const usePCH = () => {
    const componentIsMounted = useRef(true);
    const { dispatchApp } = useContext(AppContext);

    useEffect(() => {
        if(componentIsMounted.current) { 
            const locationParts = window.location.hostname.split('.');
            const subDomain = locationParts.shift();
            if(subDomain === 'pch') {
                dispatchApp({ type: 'SET_PROVIDER', payload: 'pch' });
            };
		};
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
};

export default usePCH;