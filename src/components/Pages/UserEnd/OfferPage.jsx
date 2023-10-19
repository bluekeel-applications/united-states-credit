import React, { useEffect, Profiler, memo } from 'react';
import { useHistory } from 'react-router-dom';
import DirectLink from './DirectLink';
import UserSelection from './UserSelection';
import MNet from './MNet';
import FourButton from './FourButton';

const OfferPage = ({ offer, tracking, email, isRedirect, isSubmission, theme, onRender }) => {
    const history = useHistory();

    useEffect(() => {
        if (!offer) {
            history.push('/');
            return;
        };
    }, [offer, history]);

    const routedOfferPage = () => {
        console.log('setting offer page:', offer.offer_page);
        switch (offer.offer_page) {
            case 'direct_link':
                return (
                    <Profiler onRender={onRender} id='Direct'>
                        <DirectLink
                            isRedirection={isRedirect}
                            isSubmission={isSubmission}
                            url={offer['url']}
                            jump={offer['jump']}
                            tracking={tracking}
                            email={email}
                            offer={offer}
                        />
                    </Profiler>
                );

            case 'selection':
                return (
                    <Profiler onRender={onRender} id='Selection'>
                        <UserSelection 
                            theme={theme}
                            offer={offer}
                            tracking={tracking}
                            email={email}
                        />
                    </Profiler>
                );

            case 'four_button':
                return (
                    <Profiler onRender={onRender} id='Four'>
                        <FourButton 
                            offer={offer}
                            tracking={tracking}
                            email={email}
                        />
                    </Profiler>
                );

            case 'mNet':
                return (
                    <Profiler onRender={onRender} id='mNet'>
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
                    </Profiler>
                );

            default:
                console.log('offer_page not recognized!!!!', offer);
                return <h1>Oh no! an error! Please refresh the page...</h1>;
        };
        // eslint-disable-next-line
    };

    return offer ? routedOfferPage() : null;
};

export default memo(OfferPage);