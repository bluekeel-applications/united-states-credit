import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import DirectLink from '@bit/bluekeel.component-library.direct-link';

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
        pid: trackingState['pid'], 
        vertical: appState['vertical'], 
        loan_type: appState['loan_type'], 
        debt_type: appState['debt_type'], 
        debt_amount: appState['debt_amount'], 
        location: trackingState['location'], 
        hsid: trackingState['hsid'],
        email: trackingState['email']
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
                            pch={null}
                        />
                    </ContentWrapper>
                );

            // case 'selection':
            //     return (
            //         <ContentWrapper theme='usc'>
            //             <UserSelection />
            //         </ContentWrapper>
            //     );

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