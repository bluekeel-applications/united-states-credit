import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { buildFullLink } from '../../utils/helpers';
import useTrackingLayer from '../../hooks/useTrackingLayer';

const DirectLink = ({ offer }) => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const { sid, eid, hsid, email } = trackingState;
    const { url, jump } = offer;
    const componentIsMounted = useRef(true);
    useTrackingLayer();

    useEffect(() => {
        if (componentIsMounted.current) {
            const newWindowLink = buildFullLink(url, sid, eid, hsid, email, appState.pch);
            // If they were NOT placed here through redirection, then there is a click event to use.
            if(!appState.redirection || appState.em_sub) {
                window.open(newWindowLink, '_blank');
                if (jump && jump !== 'N/A') {
                    window.location.href = buildFullLink(jump, sid, eid, hsid, email, appState.pch);
                } else {
                    history.push('/verticals');
                };
            } else {
                window.location.href = newWindowLink;
            };
        };

        return () => { componentIsMounted.current = false };
        // eslint-disable-next-line
    }, []);

    return (
        <div id='857097420' className='offer-page__main'>
            <div className='offer-page__mnet-header'>
                <span className='sponsored-text-lg'>...Offers coming your way!</span>
            </div>
        </div>
    )
};

export default DirectLink;