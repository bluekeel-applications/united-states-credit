import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context';
import { ADD_USER_FLOW } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

const useTrackingLayer = () => {
	const componentIsMounted = useRef(true);
	const hasFired = useRef(false);
	const { appState, trackingState } = useContext(AppContext);
	const [addUserFlow] = useMutation(ADD_USER_FLOW);

	useEffect(() => {
		if(componentIsMounted.current && !hasFired.current) {
            addUserFlow({
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
			})
            hasFired.current = true;
		};
		
		return () => {componentIsMounted.current = false};
		// eslint-disable-next-line
	}, []);

	return;
};

export default useTrackingLayer;