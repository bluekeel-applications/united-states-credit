import React from 'react';
import Loading from '../Shared/Loading';
import { useQuery } from '@apollo/react-hooks';
import { OPTIN_OFFER } from '../../utils/queries';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import DirectLink from './DirectLink';

const OptinOffer = ({ offer_id, jump }) => {
	const { loading, error, data } = useQuery(OPTIN_OFFER, { variables: { id: offer_id } });
	  
	if (error) {
		return <div>Error</div>;
	};
	
	if (loading) {
		return <Loading />;
	};

	const showOptin = () => {
        const optinOffer = data.fetchOptinById.body;
        switch(optinOffer.offer_page) {
            case 'mNet':
                return (
                    <MNet page={optinOffer.link} />
                )
            case 'four_button':
                return (
                    <FourButton offer={optinOffer} />
                )
            case 'one_button':
                return (
                    <OneButton offer={optinOffer} />
                )
            case 'direct_link':
                return (
                    <DirectLink link={optinOffer.link} jump={jump} />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

    return(
        <div className='optin-offer offer-page__main-1'>
            {data && showOptin()}
        </div>
    )
};

export default OptinOffer;