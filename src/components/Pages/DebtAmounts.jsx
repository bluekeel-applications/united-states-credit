import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { debt_amount_buttons } from './BUTTONS';

const DebtAmounts = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: text } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <Question 
            page={{
                buttonData: debt_amount_buttons,
                handleClick: handleButtonClick,
                text: 'Your Total Amount of Debt is:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { 
                    verticalCrumb: appState.breadcrumbs.vertical,
                    loanTypeCrumb: appState.breadcrumbs.loan_type,
                    debtTypeCrumb: appState.breadcrumbs.debt_type, 
                },
                flow: { 
                    vertical: appState.vertical, 
                    loan_type: appState.loan_type
                },
                isEnd: false
            }}
        />
    )
};

export default Radium(DebtAmounts);