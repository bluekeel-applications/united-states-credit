import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DIRECT_OFFER } from '../../utils/queries';
import { ADD_SERVICE_LOG } from '../../utils/mutations';
import Loading from '../Shared/Loading';

const DirectOffer = () => {
    let history = useHistory();
    const { trackingState, dispatchApp } = useContext(AppContext);
    const [ addTagToServiceLog ] = useMutation(ADD_SERVICE_LOG);
    const execute = useRef(false);

    const handleOfferFound = (data) => {
        const offer = data.fetchDirectOffer.body;
        console.log('Found direct offer and saved to context!');
        dispatchApp({ type: 'SELECTED_OFFER', payload: offer });
        addTagToServiceLog({
            variables: {
                service: {
                    program_id: offer.program_id,
                    group_id: offer.group_id,
                    offer_id: offer.id,
                    clickId: Number(trackingState.hsid)
                }
            }
        });
        console.log('Added service log and redirecting to offer page...');
        history.push('/offer');
        return;
    };

    const { loading, data } = useQuery(DIRECT_OFFER, {
            variables: { pid: Number(trackingState.pid) },
            onCompleted: () => execute.current = true
    });

    useEffect(() => {
        if (execute.current && data) {
            handleOfferFound(data);
        };

        return () => execute.current = false;
        // eslint-disable-next-line
    }, [execute, data])

    if (loading) {
        return (
            <div className='email-optin-container'>
                <Loading />
            </div>
        )
    };

    return null;
};

export default DirectOffer;