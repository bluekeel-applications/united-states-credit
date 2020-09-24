import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import DirectLink from '@bit/bluekeel.component-library.direct-link';
import UserSelection from '@bit/bluekeel.component-library.user-selection';
import MNet from '@bit/bluekeel.component-library.m-net';
import FourButton from '@bit/bluekeel.component-library.four-button';

const OfferPage = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const [ selectedOffer ] = useState(appState.offer);

    useEffect(() => {
        if (!selectedOffer) {
            history.push('/');
            return;
        };
    }, [selectedOffer, history]);

    const trackingValues = {
        hsid: Number(trackingState['hsid']),
        pid: Number(trackingState['pid']),
        oid: Number(trackingState['oid']),
        eid: trackingState['eid'],
        sid: Number(trackingState['sid']),
        uid: trackingState['uid'] || '',
        vertical: appState['vertical'] || '', 
        loan_type: appState['loan_type'] || '', 
        debt_type: appState['debt_type'] || '', 
        debt_amount: appState['debt_amount'] || '', 
        location: trackingState['location'] || '',
        email: trackingState['email'] || '',
        ip_address: trackingState['ip_address'] || '', 
        fname: trackingState['fname'] || '', 
        lname: trackingState['lname'] || '', 
        address: trackingState['address'] || '', 
        city: trackingState['city'] || '', 
        state: trackingState['state'] || '', 
        zip: trackingState['zip'] || ''
    };

    const routedOfferPage = () => {
        switch (selectedOffer.offer_page) {
            case 'direct_link':
                return (
                    <ContentWrapper theme='usc'>
                        <DirectLink 
                            em_sub={appState['em_sub']}
                            redirection={appState['redirection']}
                            url={selectedOffer['url']}
                            jump={selectedOffer['jump']}
                            tracking={trackingValues}
                        />
                    </ContentWrapper>
                );

            case 'selection':
                return (
                    <UserSelection 
                        theme='usc'
                        offer={selectedOffer}
                        tracking={trackingValues}
                    />
                );

            case 'four_button':
                return (
                    <FourButton 
                        offer={selectedOffer}
                        tracking={trackingValues}
                        wrapper={{
                            theme: 'usc',
                            crumbs: {
                                verticalCrumb: appState.breadcrumbs['vertical'],
                                loanTypeCrumb: appState.breadcrumbs['loan_type'],
                                debtTypeCrumb: appState.breadcrumbs['debt_type'],
                                debtAmountCrumb: appState.breadcrumbs['debt_amount'],
                                optinCrumb: appState.breadcrumbs['optin']
                            },
                            isEnd: true
                        }}
                    />
                );

            case 'mNet':
                return (
                    <MNet 
                        user={{
                            sid: trackingState['sid'],
                            eid: trackingState['eid'],
                            hsid: trackingState['hsid'],
                            page: selectedOffer['url']
                        }}
                        tracking={trackingValues}
                    />
                );

            default:
                console.log('offer_page not recognized!!!!', selectedOffer);
                return (
                    <ContentWrapper theme='usc'>
                        Oh no! an error thingy happened! Please refresh the page...
                    </ContentWrapper>
                );
        };
    }

    return selectedOffer ? routedOfferPage() : null;
};

export default OfferPage;