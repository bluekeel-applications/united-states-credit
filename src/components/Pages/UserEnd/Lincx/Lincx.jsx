import React, { useEffect, useRef, memo } from 'react';
import useTrackingLayer from '../../../../utils/hooks/useTrackingLayer';

const Lincx = ({ tracking, email }) => {
    const componentIsMounted = useRef(true);
    useTrackingLayer(tracking, email);

    useEffect(() => {
        if(componentIsMounted.current) {
            let sct;
            (function() {
                sct = document.createElement('script');
                let containerDiv = document.getElementById('lincx-div');
                sct.type = 'text/javascript';
                sct.src = 'https://api.lincx.com/load';
                sct.setAttribute('data-zone-id', 'fk41da');
                sct.setAttribute('data-affsub', 'bluekeel');
                sct.setAttribute('data-category', '');
                sct.setAttribute('data-origin-id', '3x03to0');
                sct.setAttribute('data-s1', 'bluekeel');
                sct.setAttribute('data-s2', tracking.sid);
                sct.setAttribute('data-s3', tracking.eid);
                containerDiv.parentNode.insertBefore(sct, containerDiv);
            })();
        }

        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
    
    return <div id='lincx-div' />;
};

export default memo(Lincx);