import React from 'react';
// import GET_OFFER_BY_GROUP from '../utils/graphql/GET_OFFER_BY_GROUP';
// import ADD_SERVICE_LOG from '../utils/graphql/ADD_SERVICE_LOG';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { useQuery, useMutation } from '@apollo/react-hooks';
import DirectLink from '../DirectLink';
import UserSelection from '../UserSelection';
import MNet from '../MNet';
import FourButton from '../FourButton';

const OfferGroup = ({ offer_group, tracking, email, theme }) => {

    const routedOfferPage = () => {
        switch (offer_group.offer_page) {
            case 'direct_link':
                return (
                    <DirectLink
                        isRedirection={tracking.isRedirect}
                        isSubmission={tracking.isSubmission}
                        url={offer_group['url']}
                        jump={offer_group['jump']}
                        tracking={tracking}
                        email={email}
                        kwd={offer_group['kwd']}
                        offer={offer_group}
                    />
                );

            case 'selection':
                return (
                    <UserSelection 
                        theme={theme}
                        offer={offer_group}
                        tracking={tracking}
                        email={email}
                    />
                );

            case 'four_button':
                return (
                    <FourButton 
                        offer={offer_group}
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
                            page: offer_group['url']
                        }}
                        tracking={tracking}
                        email={email}
                    />
                );

            default:
                console.log('offer_page not recognized!!!!', offer_group);
                return <h1>Oh no! an error! Please refresh the page...</h1>;
        };
    }

    return !!offer_group ? routedOfferPage() : null;
};

export default OfferGroup;