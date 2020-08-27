import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DIRECT_OFFER } from '../../utils/queries';
import { ADD_SERVICE_LOG } from '../../utils/mutations';
import FlowPage from '../Layout/FlowPage';
import Loading from '../Shared/Loading';

const DirectOffer = () => {
    let history = useHistory();
    const { trackingState, dispatchApp } = useContext(AppContext);

    const { loading, error, data } = useQuery(DIRECT_OFFER, {
            variables: { pid: Number(trackingState.pid)
        }
    });

    const [addTagToServiceLog] = useMutation(ADD_SERVICE_LOG);

    useEffect(() => {
        if (data) {
            const offer = data.fetchDirectOffer.body;
            dispatchApp({ type: 'SELECTED_OFFER', payload: offer });
            addTagToServiceLog({
                variables: {
                    service: {
                        program_id: offer.program_id,
                        group_id: offer.group_id,
                        offer_id: offer.id,
                        clickId: Number(trackingState.hsid)
                    }
                },
                skip: !offer.program_id || !offer.group_id || !offer.id || !trackingState.hsid
            });
            history.push('/offers');
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