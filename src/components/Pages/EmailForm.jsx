import React, { useContext } from 'react';
import { AppContext } from '../../context';
import EmailCapture from '@bit/bluekeel.component-library.email-capture';

const EmailForm = () => {
    const { 
        appState, trackingState, 
        dispatchApp, dispatchTracking 
    } = useContext(AppContext);

    const tracking = {
        hsid: Number(trackingState['hsid']),
        pid: Number(trackingState['pid']),
        oid: Number(trackingState['oid']),
        eid: trackingState['eid'],
        sid: Number(trackingState['sid']),
        uid: trackingState['uid'],
        vertical: appState['vertical'], 
        loan_type: appState['loan_type'], 
        debt_type: appState['debt_type'], 
        debt_amount: appState['debt_amount'],
        debt_optin: appState['debt_optin'],
        checking_optin: appState['checking_optin'],
        location: trackingState['location'],
        email: trackingState['email'] || '',
        ip_address: trackingState['ip_address'] || '', 
        fname: trackingState['fname'] || '', 
        lname: trackingState['lname'] || '', 
        address: trackingState['address'] || '', 
        city: trackingState['city'] || '', 
        state: trackingState['state'] || '', 
        zip: trackingState['zip'] || ''
    };

    const crumbs = {
        verticalCrumb: appState.breadcrumbs['vertical'],
        loanTypeCrumb: appState.breadcrumbs['loan_type'],
        debtTypeCrumb: appState.breadcrumbs['debt_type'],
        debtAmountCrumb: appState.breadcrumbs['debt_amount'],
        optinCrumb: appState.breadcrumbs['optin']
    };

    const dispatches = {
        app: dispatchApp,
        tracking: dispatchTracking
    };

    return (        
        <EmailCapture 
            tracking={tracking}
            dispatches={dispatches}
            isSubmission={appState.em_sub}
            theme='usc'
            crumbs={crumbs}
        />
    )
};

export default EmailForm;