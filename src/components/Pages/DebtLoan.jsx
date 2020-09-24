import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import DebtOptin from '@bit/bluekeel.component-library.debt-optin';

const DebtLoan = () => {
    let history = useHistory();
    const { appState, dispatchApp } = useContext(AppContext);

    const wrapperData = {
        theme: 'usc',
        crumbs: {
            verticalCrumb: appState.breadcrumbs['vertical'],
            loanTypeCrumb: appState.breadcrumbs['loan_type'],
            debtTypeCrumb: appState.breadcrumbs['debt_type'],
            debtAmountCrumb: appState.breadcrumbs['debt_amount'],
            optinCrumb: appState.breadcrumbs['optin']
        },
        flow: {
            vertical: 'personal_loans',
            loan_type: 'debt_consolidation'
        },
        isEnd: true
    };
    const handlerFunctions = {
        handleYes: () => {
            dispatchApp({ type: 'DEBT_OPT_IN' });
            window.scrollTo(0, 0);
            history.push('/email_optin');
        },
        handleNo: () => {
            window.scrollTo(0, 0);
            history.push('/email_optin');
        }
    };

    return <DebtOptin handlers={handlerFunctions} wrapper={wrapperData} />
};

export default DebtLoan;