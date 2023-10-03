import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DirectLink from './DirectLink';
import UserSelection from './UserSelection';
import MNet from './MNet';
import FourButton from './FourButton';

const OfferPage = ({ offer, tracking, email, isRedirect, isSubmission, theme }) => {
    const history = useHistory();

    useEffect(() => {
        if (!offer) {
            history.push('/');
            return;
        };
    }, [offer, history]);

    const routedOfferPage = () => {
        switch (offer.offer_page) {
            case 'direct_link':
                return (
                    <DirectLink
                        isRedirection={isRedirect}
                        isSubmission={isSubmission}
                        url={offer['url']}
                        jump={offer['jump']}
                        tracking={tracking}
                        email={email}
                        offer={offer}
                    />
                );

            case 'selection':
                return (
                    <UserSelection 
                        theme={theme}
                        offer={offer}
                        tracking={tracking}
                        email={email}
                    />
                );

            case 'four_button':
                return (
                    <FourButton 
                        offer={offer}
                        tracking={tracking}
                        email={email}
                    />
                );

            case 'mNet':
                return (
                    <MNet 
                        user={{
                            sid: tracking['sid'],
                            eid: tracking['eid'],
                            hsid: tracking['hsid'],
                            page: offer['url']
                        }}
                        tracking={tracking}
                        email={email}
                    />
                );

            default:
                console.log('offer_page not recognized!!!!', offer);
                return <h1>Oh no! an error! Please refresh the page...</h1>;
        };
    }

    return offer ? routedOfferPage() : null;
};

export default OfferPage;