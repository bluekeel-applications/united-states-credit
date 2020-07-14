import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useQuery } from '@apollo/react-hooks';
import { ENDPOINT_OFFER } from '../utils/queries';

const useOfferFinder = () => {
    const [offerData, setNewOffer] = useState(null);
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

	const flows = {
        'pid': Number(pid),
        'vertical': vertical,
        'loan_type': loan_type,
        'debt_type': debt_type,
        'debt_amount': debt_amount,
        'checking_optin': checking_optin,
        'debt_optin': debt_optin
    };

    const queryObj = {
        variables: {
            queryData: flows,
            user: {
                location: trackingState.location || 'N/A',
                clickId: trackingState.hsid
            }
        }
    }

	const { loading, error, data } = useQuery(ENDPOINT_OFFER, queryObj);

	useEffect(() => {
		if (data && !offerData) {
            setNewOffer(data.fetchEndpointOffer.body);
        };
	}, [data, offerData]);

	return [data, error, loading];
};

export default useOfferFinder;