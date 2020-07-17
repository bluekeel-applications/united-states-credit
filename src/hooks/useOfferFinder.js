import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ENDPOINT_OFFER } from '../utils/queries';
import { ADD_SERVICE_LOG } from '../utils/mutations';

const useOfferFinder = () => {
    const [ offerData, setNewOffer ] = useState(null);
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
    const [ addTagToServiceLog ] = useMutation(ADD_SERVICE_LOG);

	useEffect(() => {
		if (data && !offerData) {
            const { program_id, group_id, id } = data.fetchEndpointOffer.body;
            setNewOffer(data.fetchEndpointOffer.body);
            addTagToServiceLog({ 
                variables: {
                    service: {
                        program_id,
                        group_id,
                        offer_id: id,
                        clickId: Number(trackingState.hsid)
                    }
                },
                skip: !program_id || !group_id || !id || !trackingState.hsid
            })
        };
        // eslint-disable-next-line
	}, [data, offerData]);

	return [data, error, loading];
};

export default useOfferFinder;