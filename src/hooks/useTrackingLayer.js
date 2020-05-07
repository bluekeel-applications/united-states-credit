import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import { ADD_USER_FLOW, INSERT_COMMON_INFO } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { firePixelBlueKeel, firePixelBing, firePixelGoogle } from '../utils/pixels';

const useTrackingLayer = () => {
	const componentIsMounted = useRef(true);
	const hasFired = useRef(false);
	const { appState, trackingState } = useContext(AppContext);
	const [addUserFlow] = useMutation(ADD_USER_FLOW);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);
	let isEnd = appState.flowState.vertical && appState.flowState.loan_type;

	useEffect(() => {
		if(!isEnd) return;
		if(componentIsMounted.current && !hasFired.current) {
            (async () => {
				firePixelBing(appState.flowState.vertical);
        		firePixelGoogle();
				const promises = [
					await firePixelBlueKeel(trackingState.hsid).catch(e => e),
					await addUserFlow({ 
						variables: { 
							clickId: Number(trackingState.hsid), 
							flow: {
								'pid': Number(trackingState.pid),
								'vertical': appState.flowState.vertical,
								'loan_type': appState.flowState.loan_type,
								'debt_type': appState.flowState.debt_type,
								'debt_amount': appState.flowState.debt_amount,
								'checking_optin': appState.flowState.checking_optin,
								'debt_optin': appState.flowState.debt_optin
							} 
						}
					}).catch(e => e),
					await insertCommonInfo({ 
						variables: { 
							visitor: {
								'hsid': Number(trackingState.hsid),
								'oid': Number(trackingState.oid),
								'eid': trackingState.eid,
								'sid': Number(trackingState.sid),
								'uid': trackingState.uid,
								'ip_address': trackingState.ip_address
							}
						} }).catch(e => e)
					];
        			await Promise.all(promises);
				}
			)();
            hasFired.current = true;
		};
		
		return () => {componentIsMounted.current = false};
		// eslint-disable-next-line
	}, []);

	return;
};

export default useTrackingLayer;