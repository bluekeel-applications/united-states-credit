import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const DebtTypes = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        history.push('/debt_amount');        
    };

    return (
        <FlowPage
            page={'debt_types'}
            handleClick={handleFlowClick}
            showCrumbs
        />
    )
};

export default DebtTypes;