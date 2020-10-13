import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './debt_type';

const SelectDebtType = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: text } });
        window.scrollTo(0, 0);
        switch (choice) {
            case 'credit_card':
                history.push('/debt_amount');
                return;

            case 'personal_loan':
                history.push('/debt_amount');
                return;

            default:
                history.push('/email_optin');
                return;
        }; 
    };

    return (
        <FlowPage 
            page={{
                buttonData: buttons,
                handleClick: handleButtonClick,
                text: 'Your primary type of Debt is:'
            }}
        />
    )
};

export default SelectDebtType;