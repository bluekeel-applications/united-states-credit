import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import Loading from '../../Shared/Loading';
import axios from 'axios';

const DuplicateCheck = () => {
    const [ isDuplicate, setIsDuplicate ] = useState(null);
    const { trackingState } = useContext(AppContext);
    const AveI = `https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9523&pid=3389&eid=${trackingState.sid}&uid=${trackingState.eid}&subid2=${trackingState.hsid}`;
    const System1 = `https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9445&pid=3349&eid=${trackingState.sid}&uid=${trackingState.eid}&kwd=${trackingState.kwd}&subid2=${trackingState.hsid}`;

    const checkForDuplicate = async() => {
        if(!trackingState.email) {
            //No email, so we send to backup
            console.log('Missing email - Setting to duplicate');
            setIsDuplicate(true);
            return;
        };
        const url = `https://28ohcsi2ph.execute-api.us-east-1.amazonaws.com/running/check/${trackingState.email}`;

        const response = await axios({
            method: 'GET',
            url,
        });
        if(response.data === 'UNIQUE') {
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
            console.log('Email is a duplicate - sending to System 1');
            window.location.href = System1;
            return;
        };
        console.log('Email is unique - sending to Avenue I');
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