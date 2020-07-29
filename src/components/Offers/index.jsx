import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import Loading from '../Shared/Loading';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import OfferWall from './OfferWall';
import OptinOffer from './OptinOffer';
import UserSelection from './UserSelection';
import FlowPage from '../Layout/FlowPage';

const Offers = () => {
    const { appState, trackingState } = useContext(AppContext);
    const [ selectedOffer ] = useState(appState.offer);
        
    useEffect(() => {
        if (!selectedOffer) {
            window.location.pathname = '/';
            return;
        };
        // eslint-disable-next-line
    }, []);

    const ShowOffers = () => {
        switch(selectedOffer.offer_page) {
            case 'mNet':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <MNet page={selectedOffer.url} />
                        </div>
                    </FlowPage>
                )
            case 'four_button':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <FourButton offer={selectedOffer} />
                        </div>
                    </FlowPage>
                )
            case 'one_button':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <OneButton offer={selectedOffer} />
                        </div>
                    </FlowPage>
                )
            case 'offer_wall':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <OfferWall offer={selectedOffer} />
                        </div>
                    </FlowPage>
                )
            case 'optin':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <OptinOffer 
                                optin_id={selectedOffer.optin.optin_id} 
                                jump={selectedOffer.jump} 
                                sid={trackingState.sid} 
                                eid={trackingState.eid}
                                hsid={trackingState.hsid}
                            />
                        </div>
                    </FlowPage>
                )
            case 'selection':
                return (
                    <FlowPage>
                        <div className='flow-content offer-container'>
                            <UserSelection />
                        </div>
                    </FlowPage>
                )
            default:
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <Loading />
                        </div>
                    </FlowPage>
                )
        }
    };

    return selectedOffer ? (<ShowOffers data={selectedOffer} />) : null;
};

export default Offers;