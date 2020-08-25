import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../../Layout/FlowPage';
import CloseFlow from '../../Shared/CloseFlow';
import Loading from '../../Shared/Loading';
import useOfferFinder from '../../../hooks/useOfferFinder';
import MoveToOfferButtons from './MoveToOfferButtons';
import EmailTerms from './EmailTerms';
import EmailInput from './EmailInput';

const EmailOptin = () => {
    const { trackingState, appState } = useContext(AppContext);
    let history = useHistory();
    const [ emailValue, setEmail ] = useState(trackingState.email ? trackingState.email : '');
    const [ disabled, setDisabledState ] = useState(emailValue === '');
    const [ data, error, loading ] = useOfferFinder();

    useEffect(() => {
        if (data && data.fetchEndpointOffer.success) {
            console.log('Offer found and set to context.');
            // TODO Also, this is a good place to check for exisiting email and forward user
        };
        if (data && !data.fetchEndpointOffer.success) {
            console.log('Offer not found...lets start over!', data.fetchEndpointOffer);
            history.push('/');
            return;
        };
        // eslint-disable-next-line
    }, [data]);

    const handleReadyChange = () => {
        setDisabledState(false);
    };

    if(error) {
        console.log('error:', error);
        history.push('/error');
        return;
    };

    if(loading) {
        return (
            <FlowPage>
                <div className='email-content flow-content'>
                    <CloseFlow />
                    <div className='email-optin-container'>
                        <Loading />
                    </div>
                </div>
            </FlowPage>
        )
    };

    return (
        <FlowPage showCrumbs={appState.showStory}>
            {!appState.showExpansion && <CloseFlow />}
            <div className='email-optin-container'>
                <div className='email-optin-card'>
                    <div className='email-optin-text'>Would you like to receive relevant credit offers from <b><em>The Card Note</em></b> and <b><em>Card Matcher</em></b> directly to your inbox?</div>                    
                        <form className='email-form-container'>                                
                            <EmailInput
                                email={emailValue}
                                setEmail={setEmail}
                                setEmailReady={handleReadyChange}
                            />
                            <EmailTerms disabled={disabled} />
                            <MoveToOfferButtons
                                disabledState={disabled}
                                email={emailValue}
                            />
                        </form>
                </div>            
            </div>
        </FlowPage>
    )
};

export default EmailOptin;