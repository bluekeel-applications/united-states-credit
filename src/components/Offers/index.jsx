import React, { useContext, useRef, useEffect } from 'react';
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

        const res = await Promise.all(promises);
        console.log('tracking:', res);
    };

    useEffect(() => {
        if(!isEnd) {
            history.push('/');
        };
        
        if(componentIsMounted.current && !hasFired.current && isEnd) {
            handleTracking();
            hasFired.current = true;
        };
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
      }, []);
    
    if (error) {
		return <div>Error</div>;
	};
	
	if (loading) {
		return <LoadingWave />;
	};

    const showOffers = () => {
        const EndpointOffer = data.fetchEndpointOffer.body;
        console.log('offer-page:', EndpointOffer.offer_page);
        switch(EndpointOffer.offer_page) {
            case 'mNet':
                return (
                    <MNet page={EndpointOffer.url} />
                )
            case 'four_button':
                return (
                    <FourButton offer={EndpointOffer} />
                )
            case 'one_button':
                return (
                    <OneButton offer={EndpointOffer} />
                )
            case 'offer_wall':
                return (
                    <Wall offer={EndpointOffer} />
                )
            case 'direct_link':
                return (
                    <DirectLink link={EndpointOffer.url} jump={EndpointOffer.jump} />
                )
            case 'optin':
                return (
                    <OptinOffer offer_id={EndpointOffer.id} jump={EndpointOffer.jump} />
                )
            default:
                return (
                    <Loading />
                )
        }
    };

    return (
        <FlowPage>
            <div className='flow-content offer-container'>
                {data && showOffers()}
            </div>
        </FlowPage>
    )
};

export default Offers;