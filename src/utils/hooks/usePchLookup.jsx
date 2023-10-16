import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import PCH_USER from '../graphql/PCH_USER';
import ADD_USER_PCH from '../graphql/ADD_USER_PCH';
import { useMutation } from '@apollo/client';

const usePchLookup = (pt1, pt2, hsid, dispatchTracking) => {
	const [ pchUser, setPchUser ] = useState(null);
	const [ pchComplete, setPchComplete ] = useState(false);

	const [ addUserPCH ] = useMutation(ADD_USER_PCH, {
        onCompleted: () => {
			console.log('PCH User added to Mongo. Setting flag to complete.');
			setPchComplete(true);
		}
    });

	const handleError = () => {
		console.log('Error occurred during pch lookup. Check API logs...');
		setPchComplete(true);
	};

	const handleCompletion = (data) => {
		if(data.fetchUserInfo.success) {
			console.log('Fetched PCH user data:', data.fetchUserInfo.message);
			const userRes = data.fetchUserInfo.body;
			const userData = {
				title: userRes['Title'],
				email: userRes['EmailAddress'],
				fname: userRes['FirstName'],
				lname: userRes['LastName'],
				address: userRes['Address1'],
				city: userRes['City'],
				state: userRes['State'],
				zip: userRes['ZipCode']
			};
			dispatchTracking({ type: 'SET_PCH_USER', payload: userData });
			setPchUser(userData);
			// We arent finished yet... need to post to mongo before flag switch
			return;
		};
		// Error occurred during lookup...lets move on.
		setPchComplete(true);
		return;
	};

	useQuery(PCH_USER, {	
		variables: { pat: pt1, gmt: pt2 },
		errorPolicy: 'all',
		onCompleted: handleCompletion,
		onError: handleError,
		skip: pt1 === 'N/A' || pt2 === 'N/A' || !!pchUser
	});

	useEffect(() => {
		if(pt1 === 'N/A' || pt2 === 'N/A') {
			setPchComplete(true);
		};
		// eslint-disable-next-line
	},[]);

	useEffect(() => {
		if(!!pchUser && !!hsid) {
			addUserPCH({
				variables: {
					clickId: hsid,
					pch: {
						gmt: pt2,
						title: pchUser['title'],
						firstname: pchUser['fname'],
						lastname: pchUser['lname'],
						address: pchUser['address'],
						city: pchUser['city'],
						state: pchUser['state'],
						zipcode: pchUser['zip']
					}
				}
			});
		};
		// eslint-disable-next-line
	},[pchUser, hsid]);

	return pchComplete;
};

export default usePchLookup;