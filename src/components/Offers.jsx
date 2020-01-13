import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import { useHistory } from 'react-router-dom';
import { getOfferList } from '../utils/helpers';

const Offers = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    const componentIsMounted = useRef(true);
    let history = useHistory();

    const handleOfferChoice = (response) => {
        let clicks = response.click_count;
        let num = clicks.toString();
        console.log('num:', num.length);
        let digitLength = num.length;
        clicks = num.substring(digitLength - 3, digitLength - 1);
        console.log('Clicks:', clicks);
    };

    useEffect(() => {
        let isEnd = appState.flowState.vertical && appState.flowState.loan_type;
        const fetchOfferList = async () => {
            if (componentIsMounted.current && isEnd) {
                dispatchApp({ type: 'FETCH_OFFERS' });
                const res = await getOfferList(appState.flowState);
                if(res && res.length > 0) {
                    dispatchApp({ type: 'FETCH_OFFERS_SUCCESS', payload: res[0] });
                    handleOfferChoice(res[0]);         
                } else {history.push('/')};
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

    return (
        <div className='offers-container'>
            {appState.loadingOffers ? (<div>Loading</div>) : (<div>Offers</div>)}
        </div>
    )
};

export default Offers;