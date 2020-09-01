import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useQuery } from '@apollo/react-hooks';
import { PCH_USER } from '../utils/queries';
import { ADD_USER_PCH } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { setCookie } from '../utils/helpers';

const usePchAPI = () => {
	const { dispatchApp, dispatchTracking, trackingState } = useContext(AppContext);
	const [ userPAT, setUserPAT ] = useState(null);
	const [ userGMT, setUserGMT ] = useState(null);

	const [ addUserPCH ] = useMutation(ADD_USER_PCH);

	const handleCompletion = (data, error) => {
		if(data) {
			console.log('Fetched PCH user data:', data.fetchUserInfo.message);
			const user = data.fetchUserInfo.body;
			dispatchApp({ type: 'FOUND_PCH_USER', payload: user });
			dispatchTracking({ type: 'SET_PCH_USER', payload: user });
			setCookie('em_sub', user.Email, 30);
			addUserPCH({
				variables: {
					clickId: Number(trackingState.hsid),
					pch: {
						gmt: userGMT,
						title: user.Title,
						firstname: user.FirstName,
						lastname: user.LastName,
						address: user.Address1,
						city: user.City,
						state: user.State,
						zipcode: user.ZipCode
					}
				},
				skip: !user
			})
		};
		if(error) {
			console.error('ERROR fetching PCH user:', error);
		};
	};

	useQuery(
		PCH_USER,
		{	variables: { 
				pat: userPAT,
				gmt: userGMT
			},
			skip: !userPAT || !userGMT,
			onCompleted: handleCompletion
		}
	);
	
    useEffect(() => {
		if(trackingState.pt1 && trackingState.pt2) {
			setUserPAT(trackingState.pt1);
			setUserGMT(trackingState.pt2);
		};
        // eslint-disable-next-line
	}, [trackingState]);

	return;
};

export default usePchAPI;