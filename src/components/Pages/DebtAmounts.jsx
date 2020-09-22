import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import QuestionButtons from '@bit/bluekeel.component-library.question-buttons';
import Radium from 'radium';
import { debt_amount_buttons } from './BUTTONS';
import QuestionTitle from '../Shared/QuestionTitle';

const DebtAmounts = () => {
    const { appState, dispatchApp } = useContext(AppContext);
    let history = useHistory();

    const handleButtonClick = (e, choice, texts) => {
        e.preventDefault();
        dispatchApp({ type: 'DEBT_AMOUNT_PICKED', payload: { value: choice, crumb: texts } });
        window.scrollTo(0, 0);
        history.push('/email_optin');
    };

    return (
        <ContentWrapper
            key='debt-amount'
            crumbs={{
                verticalCrumb: appState.breadcrumbs.vertical,
                loanTypeCrumb: appState.breadcrumbs.loan_type,
                debtTypeCrumb: appState.breadcrumbs.debt_type,
            }}
            flow={{ vertical: appState.vertical, loan_type: appState.loan_type }}
            theme='usc'
        >
            <div style={{ padding: '20px 0' }}>
                <QuestionTitle text={'Your total Amount of Debt is:'} />
                <QuestionButtons 
                    buttonData={debt_amount_buttons}
                    handleClick={handleButtonClick}
                />
            </div>
        </ContentWrapper>
    )
};

export default Radium(DebtAmounts);