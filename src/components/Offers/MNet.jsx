import React, { useRef, useEffect } from 'react';
import useScript from '../../hooks/useScript';

const MNet = () => {
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
        <div id='857097420' className='offer-page__main'>
            <span className='sponsored-text'>Sponsored: </span>
            <span style={{fontSize: '1.7rem'}}>Explore the options below</span>
        </div>
    )
};

export default MNet;