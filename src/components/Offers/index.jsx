import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { handleOfferChoice } from '../../utils/helpers';
import { getOfferList } from '../../utils/middleware';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import Zoom from 'react-reveal/Zoom';

const Offers = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    const componentIsMounted = useRef(true);
    let history = useHistory();

    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;

    useEffect(() => {
        const fetchOfferList = async () => {
            if (componentIsMounted.current && isEnd) {
                dispatchApp({ type: 'FETCH_OFFERS' });
                const res = await getOfferList(appState.flowState);
                if(res && res.length > 0 && res[0].status === 'failed') {
                    console.log('retrying: fetch offers...')
                    fetchOfferList();
                }
                if(res && res.length > 0 && !res[0].status) {
                    console.log('res:', res)
                    dispatchApp({ type: 'FETCH_OFFERS_SUCCESS', payload: res[0] });
                    handleOfferChoice(res[0], dispatchApp);        
                };
                return res;
            };
            // If user is here without vertical or loantype; send home;
            history.push('/');
        }
        fetchOfferList();
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const showOffers = () => {
        // const offerUrl = new URL(appState.link);
        // let vendor = offerUrl.searchParams.get('vendor') || null;
        const vendor = appState.offer_page;
        if(!!vendor) {
            switch(vendor) {
                case 'mnet':
                    return (
                        <MNet />
                    )
                case 'four':
                    return (
                        <FourButton />
                    )
                case 'single':
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
            <>
                {appState.loadingOffers ? (<div>Loading</div>) : (<div>{isEnd && appState.link && (showOffers())}</div>)}
            </>
        </Zoom>
    )
};

export default Offers;