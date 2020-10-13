import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './personal_loans';

const SelectLoanType = () => {
    const { dispatchApp, trackingState } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({
                type: 'VERTICAL_PICKED',
                payload: { value: 'personal_loans', crumb: 'Personal Loans' }
            });
        };
        return () => { componentIsMounted.current = false };
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

    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: text } });
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
        <FlowPage 
            page={{
                buttonData: buttons,
                handleClick: handleButtonClick,
                text: 'Select Loan Purpose:'
            }}
        />
    )
};

export default SelectLoanType;