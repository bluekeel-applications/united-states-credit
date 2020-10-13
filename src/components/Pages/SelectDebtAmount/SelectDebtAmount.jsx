import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './debt_amount';

const SelectDebtAmount = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();


    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: text } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <FlowPage 
            page={{
                buttonData: buttons,
                handleClick: handleButtonClick,
                text: 'Your Total Amount of Debt is:'
            }}
        />
    )
};

export default SelectDebtAmount;