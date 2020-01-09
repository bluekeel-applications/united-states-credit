import React, { useContext } from 'react';
import { AppContext } from '../context';

import FlowPage from './FlowPage';

const CreditCards = () => {
    const { dispatchApp } = useContext(AppContext);

    const handleFlowClick = (choice) => {
        dispatchApp({ type: 'CC_TYPE_PICKED', payload: choice });
    };

    return (
        <div className='flow-container'>
            <FlowPage
                page={'credit_cards'}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default CreditCards;