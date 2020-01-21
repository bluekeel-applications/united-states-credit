import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../FlowPage';

const AutoLoans = () => {
    const page_value = 'auto_loans';
    const page_crumb = 'Auto Loans';
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const componentIsMounted = useRef(true);

    useEffect(() => {
            if (componentIsMounted.current) {
                dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: page_value, crumb: page_crumb } });                
            };
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    const handleFlowClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'LOAN_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        history.push('/offers');
    };

    return (
        <div className='flow-container'>
            <FlowPage
                page={page_value}
                handleClick={handleFlowClick}
            />
        </div>
    )
};

export default AutoLoans;