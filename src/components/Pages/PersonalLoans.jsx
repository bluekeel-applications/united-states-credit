import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { personal_loan_buttons } from './BUTTONS';

const PersonalLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'personal_loans', crumb: 'Personal Loans' }});                
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        switch(choice) {
            case 'debt_consolidation':
                history.push('/debt_types');
                break;

            case 'pay_taxes':
                history.push('/debt_optin');
                break;
            
            default:
                history.push('/email_optin');
        }
    };

    return (
        <Question 
            page={{
                buttonData: personal_loan_buttons,
                handleClick: handleButtonClick,
                text: 'Select Loan Purpose:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { verticalCrumb: 'Personal Loans' },
                flow: { vertical: 'personal_loans' },
                isEnd: false
            }}
        />
    )
};

export default Radium(PersonalLoans);