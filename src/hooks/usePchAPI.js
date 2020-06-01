import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useQuery } from '@apollo/react-hooks';
import { PCH_USER } from '../utils/queries';

const usePchAPI = () => {
	const { dispatchApp, trackingState } = useContext(AppContext);
	const [ userPAT, setUserPAT ] = useState(null);
	const [ userGMT, setUserGMT ] = useState(null);

	const handleCompletion = (data) => {
		if(data) {
			console.log('pch data:', data.fetchUserInfo.message);
			const user = data.fetchUserInfo.body;
			dispatchApp({ type: 'FOUND_PCH_USER', payload: user });
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