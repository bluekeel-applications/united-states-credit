import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import Loading from '../Shared/Loading';
import useOfferFinder from '../../hooks/useOfferFinder';

const DirectOffer = () => {
    let history = useHistory();
    const [data, error, loading] = useOfferFinder();

    useEffect(() => {
        if (data && data.fetchEndpointOffer.success) {
            console.log('Direct offer found and set in context.');
            history.push('/offers');
            return;
        };

        if (data && !data.fetchEndpointOffer.success) {
            console.log('Offer not found...lets start over!');
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