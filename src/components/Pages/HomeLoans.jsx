import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { home_loan_buttons } from './BUTTONS';

const HomeLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();    
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'home_loans', crumb: 'Home Loans' } });                
        };
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <Question 
            page={{
                buttonData: home_loan_buttons,
                handleClick: handleButtonClick,
                text: 'Select Home Loan Type:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { verticalCrumb: 'Home Loans' },
                flow: { vertical: 'home_loans' },
                isEnd: false
            }}
        />
    )
};

export default Radium(HomeLoans);