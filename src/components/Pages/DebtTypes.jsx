import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { debt_type_buttons } from './BUTTONS';

const DebtTypes = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        switch(choice) {
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
        <Question 
            page={{
                buttonData: debt_type_buttons,
                handleClick: handleButtonClick,
                text: 'Your primary type of Debt is:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { 
                    verticalCrumb: appState.breadcrumbs.vertical,
                    loanTypeCrumb: appState.breadcrumbs.loan_type
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

export default Radium(DebtTypes);