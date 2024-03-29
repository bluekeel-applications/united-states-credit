import React, { useContext } from 'react';
// import React, { useContext, Profiler } from 'react';
import { AppContext } from '../../context';
// import { useNavigate } from 'react-router-dom';
// import UserEnd from '@bit/bluekeel.controllers.user-end';
import UserEnd from './UserEnd';

const EndUserFlow = () => {
    // let history = useNavigate();
    const { appState, trackingState } = useContext(AppContext);
    // const selectedVertical = appState['vertical'];
    // const isRedirection = appState['redirection'];

    // useEffect(() => {
    //     // If someone is here without being redirected, it is unintentional.
    //     if(
    //         (selectedVertical === 'direct' && !isRedirection) ||
    //         !trackingState['hsid'] || trackingState['hsid'] === '0'
    //     ) {
    //         navigate('/');
    //     };
    //     // eslint-disable-next-line
    // },[selectedVertical, isRedirection]); 

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
        zip: trackingState['zip'] || '',
        auth_group: trackingState['auth_group'],
        gclid: trackingState['gclid'] || '',
        record: trackingState['record'] || null
    };

    // const onRender = (id, phase, actualDuration, baseDuration) => {
    //     const tableData = {
    //         Component: id,
    //         Phase: phase,
    //         Actual: actualDuration,
    //         Base: baseDuration
    //     };
    //     console.table(tableData);
    // };

    // return <Profiler id="UserEnd" onRender={onRender}><UserEnd tracking={tracking} theme='usc' /></Profiler>;
    return <UserEnd tracking={tracking} theme='usc' />;
};

export default EndUserFlow;