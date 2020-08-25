import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ENDPOINT_OFFER } from '../utils/queries';
import { ADD_SERVICE_LOG } from '../utils/mutations';

const useOfferFinder = () => {
    const [ offerData, setNewOffer ] = useState(null);
	const { appState, trackingState, dispatchApp } = useContext(AppContext);

	const { loading, error, data } = useQuery(ENDPOINT_OFFER, {
        variables: {
            queryData: {
                'pid': Number(trackingState.pid),
                'vertical': appState.flowState.vertical,
                'loan_type': appState.flowState.loan_type,
                'debt_type': appState.flowState.debt_type,
                'debt_amount': appState.flowState.debt_amount
            },
            user: {
                location: trackingState.location || 'N/A',
                clickId: trackingState.hsid
            }
        }
    });
    
    const [ addTagToServiceLog ] = useMutation(ADD_SERVICE_LOG);

	useEffect(() => {
		if (data && !offerData) {
            const { program_id, group_id, id } = data.fetchEndpointOffer.body;
            setNewOffer(data.fetchEndpointOffer.body);
            dispatchApp({ type: 'SELECTED_OFFER', payload: data.fetchEndpointOffer.body });
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