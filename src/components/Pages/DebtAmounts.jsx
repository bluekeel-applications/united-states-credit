import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const DebtAmounts = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: texts } });
        history.push('/email_optin');
    };

    return (
        <FlowPage
            page={'debt_amounts'}
            handleClick={handleFlowClick}
            showCrumbs
        />
    )
};

export default DebtAmounts;