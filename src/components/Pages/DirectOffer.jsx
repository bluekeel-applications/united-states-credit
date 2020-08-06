import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import Loading from '../Shared/Loading';
import useOfferFinder from '../../hooks/useOfferFinder';

const DirectOffer = () => {
    const { dispatchApp } = useContext(AppContext);
    let history = useHistory();
    const [data, error, loading] = useOfferFinder();

    useEffect(() => {
        if (data) {
            dispatchApp({ type: 'SELECTED_OFFER', payload: data.fetchEndpointOffer.body });
            history.push('/offers');
        };

        return;
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
                <div className='padded-top email-content flow-content'>
                    <div className='email-optin-container'>
                        <Loading />
                    </div>
                </div>
            </FlowPage>
        )
    };

    return null;
};

export default DirectOffer;