import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './auto_loans';

const SelectAutoType = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({
                type: 'VERTICAL_PICKED',
                payload: { value: 'auto_loans', crumb: 'Auto Loans' }
            });
        };
        return () => { componentIsMounted.current = false };
        // eslint-disable-next-line
    }, []);

    const handleButtonClick = (e, choice, text) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: text } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };
    
    return (
        <FlowPage 
            page={{
                buttonData: buttons,
                handleClick: handleButtonClick,
                text: 'Select Car Type:'
            }}
        />
    )
};

export default SelectAutoType;