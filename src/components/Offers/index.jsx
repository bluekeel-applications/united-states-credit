import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
// import { handleOfferChoice, buildQueryObj } from '../../utils/helpers';
// import { getOfferList } from '../../utils/middleware';
import LoadingWave from '../LoadingWave';
import useOfferFinder from '../../hooks/useOfferFinder';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import Zoom from 'react-reveal/Zoom';

const Offers = () => {
    const { appState } = useContext(AppContext);

    const [ offer, error, isLoading ] = useOfferFinder();
    // const componentIsMounted = useRef(true);
    let history = useHistory();

    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;

    if(!isEnd) {
        history.push('/');
        return null;
    };

    const showOffers = () => {
        // const offerUrl = new URL(appState.link);
        // let vendor = offerUrl.searchParams.get('vendor') || null;
        const vendor = appState.offer_page;
        if(!!vendor) {
            switch(vendor) {
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
                default:
                    return (
                        <Wall />
                    )
                    
            }
        }        
    };

    return (
        <Zoom>
            <div className='offer-container'>
                {isLoading ? <LoadingWave /> : (<div>{!error && offer ? showOffers() : error }</div>)}
            </div>
        </Zoom>
    )
};

export default Offers;