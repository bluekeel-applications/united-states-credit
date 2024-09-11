import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import axios from 'axios';

const DuplicateCheck = () => {
    const [ isDuplicate, setIsDuplicate ] = useState(null);
    const { trackingState, appState } = useContext(AppContext);
    // const AveI = `https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9523&pid=3389&eid=${trackingState.sid}&uid=${trackingState.eid}&subid2=${trackingState.hsid}`;
    const AveI = `https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9884&pid=3623&eid=${trackingState.sid}&uid=${trackingState.eid}`;
    // const System1 = `https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9445&pid=3349&eid=${trackingState.sid}&uid=${trackingState.eid}&kwd=${trackingState.kwd}&subid2=${trackingState.hsid}`;
    const CCI = `https://www.bkoffers.com/hitstreet/redirect_one_step.cfm?oid=115&sid=9860&pid=3615&eid=${trackingState.sid}&uid=${trackingState.eid}&email=omit`;

    const checkForDuplicate = async() => {
        if(!trackingState.email || trackingState.email === 'omit') {
            //No email, so we send to backup
            console.log('Missing email - Setting to duplicate');
            setIsDuplicate(true);
            return;
        };

        const encodedEmail = encodeURIComponent(trackingState.email);
        const url = `${appState.uri}/check/${encodedEmail}`;

        const response = await axios({
            method: 'GET',
            url,
        });

        if(response?.data?.status === 'UNIQUE') {
            setIsDuplicate(false);
            return;
        };
        setIsDuplicate(true);
    };

    useEffect(() => {
        if(isDuplicate === null) {
            checkForDuplicate();
            return;
        };
        if(isDuplicate) {
            // Redirect to backup offer
            console.log('Email is a duplicate - sending to CCI (Loans)');
            window.location.href = CCI;
            return;
        };
        console.log('Email is unique - sending to Avelink - CPC');
        window.location.href = AveI;
// eslint-disable-next-line
    },[isDuplicate]);

    return(
        <div style={styles.main}>
            <Loading />
        </div>
    )
};

const styles = {
    main: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default DuplicateCheck;