import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import { useHistory } from 'react-router-dom';

const Offers = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    const componentIsMounted = useRef(true);
    let history = useHistory();

    useEffect(() => {
        let isEnd = appState.flowState.vertical && appState.flowState.loan_type;
        const fetchOfferList = async () => {
            if (componentIsMounted.current && isEnd) {
                dispatchApp({ type: 'FETCH_OFFERS' });
                console.log('appState:', appState);
                // const res = await getOfferList();
                // if(res.status === 200) {
                //     dispatchApp({ type: 'FETCH_OFFERS_SUCCESS', payload: res.data });
                // } else {
                //     dispatchApp({ type: 'FETCH_OFFERS_FAILURE' });
                //     fetchOfferList();
                // }
                return
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
            Offers wall
        </div>
    )
};

export default Offers;