import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const DebtTypes = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: choice });
        history.push('/debt_amount');        
    };

    return (
        <div className='flow-container'>
            <FlowPage
                page={'debt_types'}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default DebtTypes;