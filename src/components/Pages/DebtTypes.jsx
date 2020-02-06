import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';
import Breadcrumbs from '../Breadcrumbs';

const DebtTypes = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        history.push('/debt_amount');        
    };

    return (
        <>
        <Breadcrumbs />
        <div className='flow-container'>
            <FlowPage
                page={'debt_types'}
                handleClick={handleFlowClick}
            />
        </div>
        </>
    )
};

export default DebtTypes;