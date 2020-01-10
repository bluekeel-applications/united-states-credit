import React, { useContext } from 'react';
import { AppContext } from '../context';
import { useHistory } from 'react-router-dom';
import FlowPage from './FlowPage';

const CreditCards = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: choice });
        history.push('/checking_optin');
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