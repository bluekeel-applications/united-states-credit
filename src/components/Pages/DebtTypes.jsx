import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import QuestionButtons from '@bit/bluekeel.component-library.question-buttons';
import Radium from 'radium';
import { debt_type_buttons } from './BUTTONS';
import QuestionTitle from '../Shared/QuestionTitle';

const DebtTypes = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_TYPE_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        switch(choice) {
            case 'credit_card':
                history.push('/debt_amount');
                return;
            
            case 'personal_loan':
                history.push('/debt_amount');
                return;
            
            default:
                history.push('/email_optin');
                return;
        };        
    };

    return (
        <ContentWrapper
            key='debt-type'
            crumbs={{
                verticalCrumb: appState.breadcrumbs.vertical,
                loanTypeCrumb: appState.breadcrumbs.loan_type,
            }}
            flow={{ vertical: appState.vertical, loan_type: appState.loan_type }}
            theme='usc'
        >
            <div style={{ padding: '20px 0' }}>
                <QuestionTitle text={'Your primary type of Debt is:'} />
                <QuestionButtons 
                    buttonData={debt_type_buttons}
                    handleClick={handleButtonClick}
                />
            </div>
        </ContentWrapper>  
    )
};

export default Radium(DebtTypes);