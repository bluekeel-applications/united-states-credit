import React, { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import LoadingWave from '../Shared/LoadingWave';
import Loading from '../Shared/Loading';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { ENDPOINT_OFFER } from '../../utils/queries';
import { ADD_USER_FLOW, INSERT_COMMON_INFO } from '../../utils/mutations';
import FourButton from './FourButton';
import OneButton from './OneButton';
import MNet from './MNet';
import Wall from './Wall';
import DirectLink from './DirectLink';
import OptinOffer from './OptinOffer';

import FlowPage from '../Layout/FlowPage';
import { firePixelBlueKeel, firePixelBing } from '../../utils/pixels';

const ShowOffers = ({ data }) => {
    console.log('offer:', data);
    switch(data.offer_page) {
        case 'mNet':
            return (
                <MNet page={data.url} />
            )
        case 'four_button':
            return (
                <FourButton offer={data} />
            )
        case 'one_button':
            return (
                <OneButton offer={data} />
            )
        case 'offer_wall':
            return (
                <Wall offer={data} />
            )
        case 'direct_link':
            return (
                <DirectLink link={data.url} jump={data.jump} />
            )
        case 'optin':
            return (
                <OptinOffer optin_id={data.optin.optin_id} jump={data.jump} />
            )
        default:
            return (
                <Loading />
            )
    }
};

const Offers = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const { 
        vertical, 
        loan_type,
        debt_type,
        debt_amount,
        checking_optin,
        debt_optin
    } = appState.flowState;

    const pid = trackingState.pid;
    let isEnd = vertical && loan_type;
    const componentIsMounted = useRef(true);
    const hasFired = useRef(false);
    const [offerData, setNewOffer] = useState(null);

    const [addUserFlow] = useMutation(ADD_USER_FLOW);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);

    const flows = {
        'pid': Number(pid),
        'vertical': vertical,
        'loan_type': loan_type,
        'debt_type': debt_type,
        'debt_amount': debt_amount,
        'checking_optin': checking_optin,
        'debt_optin': debt_optin
    };

    const visit = {
        'hsid': Number(trackingState.hsid),
        'oid': Number(trackingState.oid),
        'eid': trackingState.eid,
        'sid': Number(trackingState.sid),
        'uid': trackingState.uid,
        'ip_address': trackingState.ip_address,
        'email': appState.email || 'null'
    };

    const { loading, error, data } = useQuery(ENDPOINT_OFFER, { variables: { queryData: flows } });

    const handleTracking = async() => {
        firePixelBing(vertical);
        const promises = [
            await firePixelBlueKeel(trackingState.hsid).catch(e => e),
            await addUserFlow({ variables: { clickId: Number(trackingState.hsid), flow: flows }}).catch(e => e),
            await insertCommonInfo({ variables: { visitor: visit } }).catch(e => e)
        ];

        await Promise.all(promises);
    };

    useEffect(() => {
        if(!isEnd) {
            history.push('/');
        };
        
        if(componentIsMounted.current && !hasFired.current && isEnd) {
            handleTracking();
            hasFired.current = true;
        };

        if (data && !offerData) {
            setNewOffer(data.fetchEndpointOffer.body);
        };

        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
      }, [data]);
    
    if (error) {
		return <div>Error</div>;
	};
	
	if (loading) {
		return <LoadingWave />;
	};

    return (
        <FlowPage showCrumbs showFinalCrumbs>
            <div className='flow-content offer-container'>
                {offerData && (<ShowOffers data={offerData} />)}
            </div>
        </FlowPage>
    )
};

export default Offers;