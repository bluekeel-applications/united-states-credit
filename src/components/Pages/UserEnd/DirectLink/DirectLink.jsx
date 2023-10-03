import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useTrackingLayer from '../utils/useTrackingLayer';
import styles from './DirectLink.css';
import Radium from 'radium';
import { buildFullLink } from './direct-link_utils';

const DirectLink = ({ isRedirection, isSubmission, email, url, jump, tracking, kwd, offer }) => {
    let history = useHistory();
    useTrackingLayer(tracking, email, offer);
    const hasFired = useRef(false);

    if(!hasFired.current) {
        const linkOut = buildFullLink(url, tracking, email, kwd);
        const jumpBehind = buildFullLink(jump, tracking, email, kwd);
        // If they were NOT placed here through redirection, but there is a click event to use.
        if(!isRedirection || isSubmission) {
            let newTab = window.open();
            newTab.location.href = linkOut;
            if (jumpBehind && jumpBehind !== 'N/A') {
                window.location.href = jumpBehind;
                hasFired.current = true;
                return;
            };
            history.push('/verticals');
            hasFired.current = true;
            return;
        } else {
            window.location.href = linkOut;
            hasFired.current = true;
        }
    };

    return (
        <div key='directing-to-offer' style={styles.main}>
            <div style={styles.header}>
                <span style={styles.text}>...Offers coming your way!</span>
            </div>
        </div>
    )
};

export default Radium(DirectLink);