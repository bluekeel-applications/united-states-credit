import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import QuestionButtons from '@bit/bluekeel.component-library.question-buttons';
import Radium from 'radium';
import { home_loan_buttons } from './BUTTONS';
import QuestionTitle from '../Shared/QuestionTitle';

const HomeLoans = () => {
    const { dispatchApp, appState } = useContext(AppContext);
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
        <ContentWrapper
            key='home-loan-type'
            crumbs={{verticalCrumb: appState.breadcrumbs.vertical}}
            flow={{ vertical: appState.vertical, loan_type: appState.loan_type }}
            theme='usc'
        >
            <div style={{ padding: '20px 0' }}>
                <QuestionTitle text={'Select Loan Type:'} />
                <QuestionButtons 
                    buttonData={home_loan_buttons}
                    handleClick={handleButtonClick}
                />
            </div>
        </ContentWrapper>
    )
};

export default Radium(HomeLoans);