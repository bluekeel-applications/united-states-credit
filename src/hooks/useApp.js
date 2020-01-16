import { useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context';

const useApp = () => {
    const componentIsMounted = useRef(true);
    const { dispatchApp } = useContext(AppContext);

    useEffect(() => {
        if(componentIsMounted) {
            (function() {
                
            })();    
        }
        return () => {
            componentIsMounted(false);
        }
    }, []);
    return [dispatchApp];
    };

export default useApp;