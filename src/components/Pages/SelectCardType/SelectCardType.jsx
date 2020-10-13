import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '@bit/bluekeel.component-library.flow-page';
import buttons from './credit_cards';

const SelectCardType = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ 
                type: 'VERTICAL_PICKED', 
                payload: { value: 'credit_cards', crumb: 'Credit Cards' } 
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
                text: 'Select Card Type:'
            }}
        />
    )
};

export default SelectCardType;