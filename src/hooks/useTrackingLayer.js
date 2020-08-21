import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import { ADD_USER_FLOW, INSERT_COMMON_INFO } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { firePixelBlueKeel } from '../utils/pixels';

const useTrackingLayer = () => {
	const componentIsMounted = useRef(true);
	const hasFired = useRef(false);
	const { appState, trackingState } = useContext(AppContext);
	const [ addUserFlow ] = useMutation(ADD_USER_FLOW);
    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO);

	useEffect(() => {
		if(componentIsMounted.current && !hasFired.current) {
            firePixelBlueKeel(trackingState.hsid);
            // firePixelBing(appState.flowState.vertical);
            // firePixelGoogle();
            insertCommonInfo({
                variables: {
                    visitor: {
                        'hsid': Number(trackingState.hsid),
                        'oid': Number(trackingState.oid),
                        'eid': trackingState.eid,
                        'sid': Number(trackingState.sid),
                        'uid': trackingState.uid,
                        'ip_address': trackingState.ip_address,
						'email': trackingState.email || appState.email || appState.pch.email || '',
						'fname': trackingState.fname,
						'lname': trackingState.lname,
						'address': trackingState.address,
						'city': trackingState.city,
						'state': trackingState.state,
						'zip': trackingState.zip,
                    }
                }
            });
            addUserFlow({
				variables: { 
					clickId: Number(trackingState.hsid), 
					flow: {
						'pid': Number(trackingState.pid),
						'vertical': appState.flowState.vertical,
						'loan_type': appState.flowState.loan_type,
						'debt_type': appState.flowState.debt_type,
						'debt_amount': appState.flowState.debt_amount
					}
				}
			})
            hasFired.current = true;
		};
		
		return () => {componentIsMounted.current = false};
		// eslint-disable-next-line
	}, []);

	return;
};

export default useTrackingLayer;