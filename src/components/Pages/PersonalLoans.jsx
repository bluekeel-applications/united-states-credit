import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { personal_loan_buttons } from './BUTTONS';

const PersonalLoans = () => {
    const { trackingState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'personal_loans', crumb: 'Personal Loans' }});                
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const isOptinProgram = () => {
        const optinPids = [3274, 3275, 3276, 3277];
        if(optinPids.includes(trackingState['pid'])) {
            console.log('This is an Opt-In program!');
            return true;
        };
        return false;
    };

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        const useOptins = isOptinProgram();

        switch(choice) {
            case 'debt_consolidation':
                history.push('/debt_types');
                break;

            case 'make_purchase':
                if(useOptins) {
                    history.push('/debt_optin');
                    break;
                }
                history.push('/email_optin');
                break;

            case 'emergency_cash':
                if(useOptins) {
                    history.push('/debt_optin');
                    break;
                }
                history.push('/email_optin');
                break;

            case 'pay_bills':
                if(useOptins) {
                    history.push('/debt_optin');
                    break;
                }
                history.push('/email_optin');
                break;

            case 'other_purpose':
                if(useOptins) {
                    history.push('/debt_optin');
                    break;
                }
                history.push('/email_optin');
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