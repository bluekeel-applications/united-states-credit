import React, { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context';
import useScript from '../../hooks/useScript';

const MNet = ({ type }) => {
    // const { trackingState, appState } = useContext(AppContext);
    const componentIsMounted = useRef(true);
    useScript('//csearchclub-a.akamaihd.net/dsi.js?cid=8CU7INKUC');

    useEffect(() => {
        if(componentIsMounted) {            
            window._mNHandle.queue.push(function () { 
                window._mNDetails.loadTag('857097420', '600x250', '857097420')
            })
        }
      
        return () => {
            componentIsMounted(false);
        }
        // eslint-disable-next-line
      }, []);
    
    return(
        <div id='857097420' style={{ width: '600px', height: '250px' }}>
            <span style={{fontSize: '75%', fontWeight: '300'}}>Sponsored: </span>
            <span className="s2">Explore the options below</span>
        </div>
    )
};

export default MNet;