import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { buildFullLink } from '../../utils/helpers';
import useTrackingLayer from '../../hooks/useTrackingLayer';

const DirectLink = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const { sid, eid, hsid, email } = trackingState;
    const { url, jump } = appState.offer;
    const componentIsMounted = useRef(true);
    useTrackingLayer();

    useEffect(() => {
        if (componentIsMounted.current) {
            const newWindowLink = buildFullLink(url, sid, eid, hsid, email, appState.pch);
            window.open(newWindowLink);
            if (jump && jump !== 'N/A') {
                window.location.href = buildFullLink(jump, sid, eid, hsid, email, appState.pch);
            } else {
                history.push('/verticals');
            };
        };

        return () => { componentIsMounted.current = false };
        // eslint-disable-next-line
    }, []);

    return (
        <div id='857097420' className='offer-page__main'>
            <div className='offer-page__mnet-header'>
                <span className='sponsored-text'>Sponsored: </span>
                <span className='sponsored-text-lg'>Explore the options below</span>
            </div>
        </div>
    )
};

export default DirectLink;