import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { selectFromMultiple } from '../../utils/helpers';
import { getOfferList } from '../../utils/middleware';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';

const Offers = () => {
    const { appState, dispatchApp } = useContext(AppContext);

    const componentIsMounted = useRef(true);
    let history = useHistory();

    const handleOfferChoice = (response) => {
        let clicks = response.click_count;
        let num = clicks.toString();        
        let digitLength = num.length;
        if(digitLength > 2) {
            clicks = num.substring(digitLength - 2, digitLength);
        }
        if(response.endpoints.length > 0) {
            let amount = response.endpoints.length === 1 ? 'single' : 'multiple';

            switch(amount) {
                case 'single':
                    dispatchApp({ type: 'SELECTED_OFFER', payload: response.endpoints[0].url});
                    return;
                case 'multiple':
                    const activeOffer = selectFromMultiple(clicks, response.endpoints);
                    dispatchApp({ type: 'SELECTED_OFFER', payload: activeOffer.url});
                    return;
                default:
                    throw new Error(`Not supported action ${amount}`);
            }
            
        } else {
            dispatchApp({ type: 'SELECTED_OFFER', payload: 'https://unitedstatescredit.blog/'});
            return;
        }
    };

    let isEnd = appState.flowState.vertical && appState.flowState.loan_type;

    useEffect(() => {
        const fetchOfferList = async () => {
            if (componentIsMounted.current && isEnd) {
                dispatchApp({ type: 'FETCH_OFFERS' });
                const res = await getOfferList(appState.flowState);
                if(res && res.length > 0) {
                    dispatchApp({ type: 'FETCH_OFFERS_SUCCESS', payload: res[0] });
                    handleOfferChoice(res[0]);        
                };
                return;
            };
            // If user is here without vertical or loantype; send home;
            history.push('/');
        }
        fetchOfferList();
        return () => {
            componentIsMounted.current = false
        };
        // eslint-disable-next-line
    }, []);

    const showOffers = () => {
        const offerUrl = new URL(appState.link);
        const vendorType = offerUrl.searchParams.get('type') || null;
        let vendor = offerUrl.searchParams.get('vendor') || null;
        switch(vendor) {
            case 'mnet':
                return (
                    <MNet type={vendorType} />
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
    };

    return (
        <div className='offers-container'>
            {appState.loadingOffers ? (<div>Loading</div>) : (<div>{isEnd && appState.link && (showOffers())}</div>)}
        </div>
    )
};

export default Offers;