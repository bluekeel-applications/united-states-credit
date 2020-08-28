import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Loading from '../Shared/Loading';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import OfferWall from './OfferWall';
import OptinOffer from './OptinOffer';
import UserSelection from './UserSelection';
import DirectLink from './DirectLink';
import FlowPage from '../Layout/FlowPage';
import * as Sentry from '@sentry/react';

const Offers = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const [ selectedOffer ] = useState(appState.offer);

    useEffect(() => {
        if (!selectedOffer) {
            history.push('/');
            return;
        };
    }, [selectedOffer, history]);

    const routedOfferPage = () => {
        const { url, offer_page } = selectedOffer;

        switch(offer_page) {
            case 'mNet':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <MNet page={url} />
                        </div>
                    </FlowPage>
                );

            case 'direct_link':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <DirectLink />
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
                );

            case 'one_button':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <OneButton offer={selectedOffer} />
                        </div>
                    </FlowPage>
                );

            case 'offer_wall':
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                        <div className='flow-content offer-container'>
                            <OfferWall offer={selectedOffer} />
                        </div>
                    </FlowPage>
                );

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
                );

            case 'selection':
                return (
                    <FlowPage>
                        <UserSelection />
                    </FlowPage>
                );

            default:
                return (
                    <FlowPage showCrumbs showFinalCrumbs>
                            <Loading />
                    </FlowPage>
                );
        }
    };

    return selectedOffer ? routedOfferPage() : null;
};

export default Sentry.withProfiler(Offers, { name: 'Offer Page' });