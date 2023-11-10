import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTrackingLayer from '../../../../utils/hooks/useTrackingLayer';
import styles from './DirectLink.css';
import Radium from 'radium';
import { buildFullLink } from './direct-link_utils';

const DirectLink = Radium(({ isRedirection, isSubmission, email, url, jump, tracking, kwd, offer }) => {
    let navigate = useNavigate();
    useTrackingLayer(tracking, email, offer);

    const linkOut = buildFullLink(url, tracking, email, kwd);
    const jumpBehind = buildFullLink(jump, tracking, email, kwd);

    useEffect(() => {
        // If they were NOT placed here through redirection, but there is a click event to use.
        if(!isRedirection || isSubmission) {
            let newTab = window.open();
            newTab.location.href = linkOut;
            if (jumpBehind && jumpBehind !== 'N/A') {
                window.location.href = jumpBehind;
                return;
            };
            navigate('/');
            return;
        } else {
            window.location.href = linkOut;
        }
        // eslint-disable-next-line
    },[])

    return (
        <div key='directing-to-offer' style={styles.main}>
            <div style={styles.header}>
                <span style={styles.text}>...Offers coming your way!</span>
            </div>
        </div>
    )
});

export default DirectLink;