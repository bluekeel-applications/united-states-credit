import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import LoadingWave from '../LoadingWave';
import Loading from '../Loading';
import useOfferFinder from '../../hooks/useOfferFinder';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import Zoom from 'react-reveal/Zoom';

const Offers = () => {
    let history = useHistory();
    const { appState } = useContext(AppContext);
    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;
    useOfferFinder();

    if(!isEnd) {
        history.push('/');
        return null;
    };

    const showOffers = () => {
        switch(appState.offer_page) {
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
            case 'wall':
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
                {!appState.loadingOffers ? showOffers() : <LoadingWave /> }
            </div>
        </Zoom>
    )
};

export default Offers;