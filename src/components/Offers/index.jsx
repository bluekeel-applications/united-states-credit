import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Loading from '../Shared/Loading';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import OfferWall from './OfferWall';
import OptinOffer from './OptinOffer';
import FlowPage from '../Layout/FlowPage';
// import useOfferFinder from '../../hooks/useOfferFinder';

const Offers = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const offerData = appState.offer
    // const [ offerData ] = useOfferFinder();
    const [ selectedOffer, setOffer ] = useState(null);
    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;
        
    useEffect(() => {
        if(!isEnd) {
            history.push('/');
            return null;
        };

        if(offerData) {
            setOffer(offerData);
        };
        // eslint-disable-next-line
    }, [offerData]);

    const ShowOffers = () => {
        switch(selectedOffer.offer_page) {
            case 'mNet':
                return (
                    <MNet page={selectedOffer.url} />
                )
            case 'four_button':
                return (
                    <FourButton offer={selectedOffer} />
                )
            case 'one_button':
                return (
                    <OneButton offer={selectedOffer} />
                )
            case 'offer_wall':
                return (
                    <OfferWall offer={selectedOffer} />
                )
            case 'optin':
                return (
                    <OptinOffer 
                        optin_id={selectedOffer.optin.optin_id} 
                        jump={selectedOffer.jump} 
                        sid={trackingState.sid} 
                        eid={trackingState.eid}
                        hsid={trackingState.hsid}
                    />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

    return (
        <FlowPage showCrumbs showFinalCrumbs>
            <div className='flow-content offer-container'>
                {selectedOffer && (<ShowOffers data={offerData} />)}
            </div>
        </FlowPage>
    )
};

export default Offers;