import React, { useContext } from 'react';
import { AppContext } from '../context';
import { useHistory } from 'react-router-dom';
import FlowPage from './FlowPage';

const PersonalLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleFlowClick = (e, choice) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: choice });
        switch(choice) {
            case 'debt_consolidation':
                history.push('/debt_types');
                break;

            case 'pay_taxes':
                history.push('/email_optin');
                break;
            
            default:
                history.push('/debt_optin');
        }
    };

    return (
        <div className='flow-container'>
            <FlowPage
                page={'personal_loans'}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default PersonalLoans;