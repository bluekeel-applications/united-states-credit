import React, { useContext } from 'react';
import { AppContext } from '../../context';
import UserEnd from '@bit/bluekeel.controllers.user-end';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';

const EndUserFlow = () => {
    const { 
        appState, trackingState
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
        isSubmission: appState['em_sub'],
        isRedirection: appState['redirection'],
        location: trackingState['state'],
        email: trackingState['email'] || '',
        ip_address: trackingState['ip_address'] || '', 
        fname: trackingState['fname'] || '', 
        lname: trackingState['lname'] || '', 
        address: trackingState['address'] || '', 
        city: trackingState['city'] || '', 
        state: trackingState['state'] || '', 
        zip: trackingState['zip'] || ''
    };

    const crumbData = {
        verticalCrumb: appState.breadcrumbs['vertical'],
        loanTypeCrumb: appState.breadcrumbs['loan_type'],
        debtTypeCrumb: appState.breadcrumbs['debt_type'],
        debtAmountCrumb: appState.breadcrumbs['debt_amount'],
        optinCrumb: appState.breadcrumbs['optin']
    };

    const wrapperData = {
        theme: 'usc',
        crumbs: crumbData,
        flow: {
            vertical: appState['vertical'],
            loan_type: appState['loan_type']
        },
        isEnd: true
    };

    return (
        <ContentWrapper {...wrapperData}>
            <UserEnd tracking={tracking} theme='usc' />
        </ContentWrapper>        
    )
};

export default EndUserFlow;