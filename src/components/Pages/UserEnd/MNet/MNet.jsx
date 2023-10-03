import React, { useRef, useEffect} from 'react';
import useMNetScript from './useMNetScript';
import useTrackingLayer from '../utils/useTrackingLayer';
import styles from './MNet.css.js';
import Radium from 'radium';

const MNet = ({ user, tracking, email }) => {
    const { sid, eid, hsid, page } = user;
    const componentIsMounted = useRef(true);
    useTrackingLayer(tracking, email);
    useMNetScript('//csearchclub-a.akamaihd.net/dsi.js?cid=8CU7INKUC');

    useEffect(() => {
        if(componentIsMounted.current) {    
            window.si_misc.query = page;  
            window.si_chnm = `${sid}-${eid}`;
            window.medianet_convTrack = { hsid }
            window._mNHandle.queue.push(function () { 
                window._mNDetails.loadTag('857097420', '600x250', '857097420');
            })
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);
    
    return(
        <div id='857097420' style={styles.main}>
            <div style={styles.header}>
                <span style={styles.text}>Sponsored: </span>
                <span style={styles.textLg}>Explore the options below</span>
            </div>
        </div>
    )
};

export default Radium(MNet);