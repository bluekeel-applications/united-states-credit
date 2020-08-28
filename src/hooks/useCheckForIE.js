import { useRef, useEffect } from 'react';

const useCheckForIE = () => {
    const ref = useRef(true);
    const isIE = useRef(false);

    function checkIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf('MSIE');
    
        // If IE, return version number.
        if (Idx > 0) {
            console.log('is IE!')
            isIE.current = true;
        } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
            console.log('is IE 11!')
            isIE.current = true;
        } else {
            console.log('is NOT IE!')
            isIE.current = false;
        }
    };
    
    const cleanUp = () => {
        ref.current = true;
        isIE.current = false;
    };

    useEffect(() => {
        if (ref.current) {
            checkIEVersion();
        };

        return cleanUp;
        // eslint-disable-next-line
    }, [ref.current]);

    return [isIE.current];
};

export default useCheckForIE;