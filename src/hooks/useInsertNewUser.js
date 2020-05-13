import { useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEW_USER } from '../utils/mutations';
import useGeoLocation from './useGeoLocation';

const useInsertNewUser = () => {
	const { trackingState } = useContext(AppContext);	
	const [ip_address, geoError] = useGeoLocation();
	const [addNewUser] = useMutation(ADD_NEW_USER);

	const createNewUser = async() => {
		const obj = {
			clickId: Number(trackingState.hsid),
			ip_address: ip_address || 'N/A',
			program: {
				pid: Number(trackingState.pid),
				oid: Number(trackingState.oid),
				eid: trackingState.eid,
				sid: Number(trackingState.sid),
				uid: trackingState.uid
			}
		}
		addNewUser( { variables: { visitor: obj } } );
	};

	useEffect(() => {
		if (ip_address && trackingState.hsid) {
			console.log('inserting new user...', trackingState.hsid);
			createNewUser(trackingState.hsid, trackingState);
		};
		if(geoError) {
			console.log('Error in geo lookup:', geoError);
			createNewUser(trackingState.hsid, trackingState);
		}
		// eslint-disable-next-line
	}, [ip_address, geoError, trackingState.hsid]);

	return;
};

export default useInsertNewUser;