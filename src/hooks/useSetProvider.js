import { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context';

const useSetProvider = () => {
    const componentIsMounted = useRef(true);
    const { dispatchApp } = useContext(AppContext);

    useEffect(() => {
        if(componentIsMounted.current) {
            const locationParts = window.location.hostname.split('.');
            const subDomain = locationParts.shift();
            if (subDomain === 'pch' || subDomain === 'staging') {
                dispatchApp({ type: 'SET_PROVIDER', payload: 'pch' });
                // dispatchApp({ type: 'SET_PCH_CREDS', payload: { pat: myURL.searchParams.get('pt1'), gmt: myURL.searchParams.get('pt2')}});
                // dispatchApp({ type: 'SHOW_EXPANSION' });
				return;
			};
			dispatchApp({ type: 'SET_PROVIDER', payload: 'bluekeel' });
		};
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
};

export default useSetProvider;