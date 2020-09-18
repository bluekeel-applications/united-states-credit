import React, { useContext } from 'react';
import { AppContext } from '../../context';
import EmailCapture from '@bit/bluekeel.component-library.email-capture';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';

const EmailForm = () => {
    const { 
        appState, trackingState, 
        dispatchApp, dispatchTracking 
    } = useContext(AppContext);

    const tracking = {
        pid: trackingState.pid, 
        vertical: appState.vertical, 
        loan_type: appState.loan_type, 
        debt_type: appState.debt_type, 
        debt_amount: appState.debt_amount, 
        location: trackingState.location, 
        hsid: trackingState.hsid,
        email: trackingState.email
    };

    const crumbs = {
        verticalCrumb: appState.breadcrumbs.vertical,
        loanTypeCrumb: appState.breadcrumbs.loan_type,
        debtTypeCrumb: appState.breadcrumbs.debt_type,
        debtAmountCrumb: appState.breadcrumbs.debt_amount,
    };

    const dispatches = {
        app: dispatchApp,
        tracking: dispatchTracking
    };

    return (
        <ContentWrapper 
            theme='usc' 
            crumbs={crumbs} 
            flow={{
                vertical: appState.vertical,
                loan_type: appState.loan_type
            }}
            isEnd={true}
        >
            <EmailCapture 
                tracking={tracking}
                dispatches={dispatches}
                isSubmission={appState.em_sub}
            />
        </ContentWrapper>
    )
};

export default EmailForm;