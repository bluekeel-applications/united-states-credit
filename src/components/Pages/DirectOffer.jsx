import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DIRECT_OFFER } from '../../utils/queries';
import { ADD_SERVICE_LOG } from '../../utils/mutations';
import FlowPage from '../Layout/FlowPage';
import Loading from '../Shared/Loading';

const DirectOffer = () => {
    let history = useHistory();
    const [offerData, setNewOffer] = useState(null);
    const { trackingState, dispatchApp } = useContext(AppContext);

    const { loading, error, data } = useQuery(DIRECT_OFFER, {
        variables: { pid: Number(trackingState.pid)
        }
    });

    const [addTagToServiceLog] = useMutation(ADD_SERVICE_LOG);

    useEffect(() => {
        if (data && data.fetchDirectOffer.success && !offerData) {
            const { program_id, group_id, id } = data.fetchDirectOffer.body;
            dispatchApp({ type: 'SELECTED_OFFER', payload: data.fetchDirectOffer.body });
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
            });
            setNewOffer(data.fetchDirectOffer.body);
            history.push('/offers');
        };
        // eslint-disable-next-line
    }, [data, offerData]);

    useEffect(() => {
        if (data && !data.fetchDirectOffer.success) {
            console.log('Offer not found...lets start over!', data.fetchEndpointOffer);
            history.push('/');
            return;
        };
        // eslint-disable-next-line
    }, [data]);

    if (error) {
        console.log('error:', error);
        history.push('/error');
        return null;
    };

    if (loading) {
        return (
            <FlowPage showCrumbs={false}>
                <div className='email-optin-container'>
                    <Loading />
                </div>
            </FlowPage>
        )
    };

    return null;
};

export default DirectOffer;