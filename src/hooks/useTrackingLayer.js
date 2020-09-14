import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { ADD_USER_FLOW, INSERT_COMMON_INFO } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { firePixelBlueKeel } from '../utils/pixels';
import { checkCookie } from '../utils/helpers';

const useTrackingLayer = () => {
	const { appState, trackingState } = useContext(AppContext);
	const [ addUserFlow ] = useMutation(ADD_USER_FLOW);
    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO);
	const [ isDuplicateEmail ] = useState(checkCookie('em_sub'));

	const executeRequest = async () => {
		try {
			firePixelBlueKeel(trackingState.hsid);
			// firePixelBing(appState.flowState.vertical);
			// firePixelGoogle();
			const insertEmail = isDuplicateEmail ? '' : trackingState.email || appState.email || appState.pch.email || '';
			console.log('email inserted in tracking layer:', insertEmail);
			insertCommonInfo({
				variables: {
					visitor: {
						'hsid': Number(trackingState.hsid),
						'oid': Number(trackingState.oid),
						'eid': trackingState.eid,
						'sid': Number(trackingState.sid),
						'uid': trackingState.uid,
						'ip_address': trackingState.ip_address,
						'email': insertEmail,
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
			});
			console.log('CommonInsert and UserFlow posted.');
		} catch (error) {
			console.log('error running trackers@!');
		};
	};

	useEffect(() => {
		executeRequest();
		// eslint-disable-next-line
	}, []);

	return;
};

export default useTrackingLayer;