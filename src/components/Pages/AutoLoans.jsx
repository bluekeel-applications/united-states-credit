import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { auto_loan_buttons } from './BUTTONS';

const AutoLoans = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'auto_loans', crumb: 'Auto Loans' } });                
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: text } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <Question 
            page={{
                buttonData: auto_loan_buttons,
                handleClick: handleButtonClick,
                text: 'Select Car Type:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { verticalCrumb: 'Auto Loans' },
                flow: { vertical: 'auto_loans' },
                isEnd: false
            }}
        />    
    )
};

export default Radium(AutoLoans);