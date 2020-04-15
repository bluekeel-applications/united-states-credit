import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import LoadingWave from '../LoadingWave';
import Loading from '../Loading';
import { useQuery } from '@apollo/react-hooks';
import { ENDPOINT_OFFER } from '../../utils/queries';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import Zoom from 'react-reveal/Zoom';

const Offers = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const offerVertical = appState.flowState.vertical;
    const loanType = appState.flowState.loan_type;
    const debtType = appState.flowState.debt_type;
    const debtAmount = appState.flowState.debt_amount;
    const pid = trackingState.pid;
    let isEnd = offerVertical && loanType;

    const queryObj = {
        'pid': pid,
        'vertical': offerVertical,
        'loan_type': loanType,
        'debt_type': debtType,
        'debt_amount': debtAmount
    };

    const { loading, error, data } = useQuery(
		ENDPOINT_OFFER,
		{ variables: { query: queryObj } }
    );
    
    if(!isEnd) {
        history.push('/');
        return null;
    };
    
    if (error) {
		return <div>Error</div>;
	};
	
	if (loading) {
		return <LoadingWave />;
	};

    const showOffers = () => {
        const EndpointOffer = data.fetchEndpointOffer.body;
        switch(EndpointOffer.offer_page) {
            case 'mNet':
                return (
                    <MNet />
                )
            case 'four_button':
                return (
                    <FourButton />
                )
            case 'one_button':
                return (
                    <OneButton />
                )
            case 'offer_wall':
                return (
                    <Wall />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

    return (
        <Zoom>
            <div className='offer-container'>
                {showOffers()}
            </div>
        </Zoom>
    )
};

export default Offers;