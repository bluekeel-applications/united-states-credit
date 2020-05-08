import React from 'react';
import Loading from '../Shared/Loading';
import { useQuery } from '@apollo/react-hooks';
import { OPTIN_OFFER } from '../../utils/queries';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import DirectLink from './DirectLink';
import { buildFullLink } from '../../utils/helpers';

const OptinOffer = ({ optin_id, jump, sid, eid }) => {
    const { loading, error, data } = useQuery(OPTIN_OFFER, { variables: { id: optin_id } });
    
    const ShowOptin = () => {
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
                window.open(buildFullLink(optinOffer.link, sid, eid));
                return (
                    <DirectLink jump={jump} />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

	if (error) {
		return <div>Error getting optin offer...</div>;
	};
	
	if (loading) {
		return <Loading />;
	};

    return(
        <div className='optin-offer offer-page__main-1'>
            {data && (<ShowOptin data={data} jump={jump} />)}
        </div>
    )
};

export default OptinOffer;