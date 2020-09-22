import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import QuestionButtons from '@bit/bluekeel.component-library.question-buttons';
import Radium from 'radium';
import { auto_loan_buttons } from './BUTTONS';
import QuestionTitle from '../Shared/QuestionTitle';

const AutoLoans = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        if (componentIsMounted.current) {
            dispatchApp({ type: 'VERTICAL_PICKED', payload: { value: 'auto_loans', crumb: 'Auto Loans' } });                
        };
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
        <ContentWrapper
            key='auto-loan-type'
            crumbs={{verticalCrumb: appState.breadcrumbs.vertical}}
            flow={{ vertical: appState.vertical, loan_type: appState.loan_type }}
            theme='usc'
        >
            <div style={{ padding: '20px 0' }}>
                <QuestionTitle text={'Select Car Type:'} />
                <QuestionButtons 
                    buttonData={auto_loan_buttons}
                    handleClick={handleButtonClick}
                />
            </div>
        </ContentWrapper>    
    )
};

export default Radium(AutoLoans);