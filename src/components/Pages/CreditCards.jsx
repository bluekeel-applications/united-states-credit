import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import Question from '@bit/bluekeel.component-library.question';
import Radium from 'radium';
import { credit_card_buttons } from './BUTTONS';

const CreditCards = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'credit_cards', crumb: 'Credit Cards' } });                
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
                buttonData: credit_card_buttons,
                handleClick: handleButtonClick,
                text: 'Select Card Type:'
            }}
            wrapper={{
                theme: 'usc',
                crumbs: { verticalCrumb: 'Credit Cards' },
                flow: { vertical: 'credit_cards' },
                isEnd: false
            }}
        />  
    )
};

export default Radium(CreditCards);