import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
// import LoadingWave from '../Shared/LoadingWave';
import Loading from '../Shared/Loading';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import OptinOffer from './OptinOffer';
import FlowPage from '../Layout/FlowPage';
import useOfferFinder from '../../hooks/useOfferFinder';

const Offers = () => {
    let history = useHistory();
    const { appState } = useContext(AppContext);
    const [ offerData ] = useOfferFinder();
    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;
    
    if(!isEnd) {
        history.push('/');
        return null;
    };
    
    const ShowOffers = () => {
        console.log('offer:', offerData);
        switch(offerData.offer_page) {
            case 'mNet':
                return (
                    <MNet page={offerData.url} />
                )
            case 'four_button':
                return (
                    <FourButton offer={offerData} />
                )
            case 'one_button':
                return (
                    <OneButton offer={offerData} />
                )
            case 'offer_wall':
                return (
                    <Wall offer={offerData} />
                )
            case 'optin':
                return (
                    <OptinOffer optin_id={offerData.optin.optin_id} jump={offerData.jump} />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

    return (
        <FlowPage showCrumbs showFinalCrumbs>
            <div className='flow-content offer-container'>
                {offerData && (<ShowOffers data={offerData} />)}
            </div>
        </FlowPage>
    )
};

export default Offers;