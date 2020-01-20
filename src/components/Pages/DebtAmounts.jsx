import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const DebtAmounts = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: choice });
        history.push('/email_optin');
    };

    return (
        <div className='flow-container'>
            <FlowPage
                page={'debt_amounts'}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default DebtAmounts;