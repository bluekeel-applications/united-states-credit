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
import FlowPage from '../Layout/FlowPage';
import { firePixelBlueKeel, firePixelBing } from '../../utils/pixels';

const Offers = () => {
    let history = useHistory();
    const { appState, trackingState } = useContext(AppContext);
    const offerVertical = appState.flowState.vertical;
    const loanType = appState.flowState.loan_type;
    const debtType = appState.flowState.debt_type;
    const debtAmount = appState.flowState.debt_amount;
    const pid = trackingState.pid;
    let isEnd = offerVertical && loanType;
    const componentIsMounted = useRef(true);
    const hasFired = useRef(false);

    const [addUserFlow] = useMutation(ADD_USER_FLOW);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);

    const { loading, error, data } = useQuery(
		ENDPOINT_OFFER,
		{ variables: { 
            queryData: {
                'pid': Number(pid),
                'vertical': offerVertical,
                'loan_type': loanType,
                'debt_type': debtType,
                'debt_amount': debtAmount
            }}
        }
    );

    useEffect(() => {
        if(!isEnd) {
            history.push('/');
            return null;
        };
        
        if(componentIsMounted.current && !hasFired.current) {  
            firePixelBlueKeel(trackingState.hsid);
            firePixelBing(offerVertical);
            addUserFlow({ variables: {
                clickId: Number(trackingState.hsid),
                flow: appState.flowState
            }});
            insertCommonInfo({ variables: {
                visitor: {
                    'hsid': Number(trackingState.hsid),
                    'oid': Number(trackingState.oid),
                    'eid': trackingState.eid,
                    'sid': Number(trackingState.sid),
                    'uid': trackingState.uid,
                    'ip_address': trackingState.ip_address,
                    'email': appState.email || 'null'
                }
            }});
            hasFired.current = true;
        };
        // Clean-up Function
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
        if(data){
            const EndpointOffer = data.fetchEndpointOffer.body;
            switch(EndpointOffer.offer_page) {
                case 'mNet':
                    return (
                        <MNet page={EndpointOffer.url}/>
                    )
                case 'four_button':
                    return (
                        <FourButton />
                    )
                case 'one_button':
                    return (
                        <OneButton />
                    )
                case 'offer_wall':
                    return (
                        <Wall />
                    )
                default:
                    return (
                        <Loading />
                    )
            }
        }
        return null;
    };

    return (
        <FlowPage>
            <div className='flow-content offer-container'>
                {showOffers()}
            </div>
        </FlowPage>
    )
};

export default Offers;