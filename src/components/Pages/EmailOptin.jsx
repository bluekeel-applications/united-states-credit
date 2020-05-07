import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL } from '../../utils/mutations.js';
import CloseFlow from '../Shared/CloseFlow';
import LoadingWave from '../Shared/LoadingWave';
import useOfferFinder from '../../hooks/useOfferFinder';
import useTrackingLayer from '../../hooks/useTrackingLayer';

const EmailOptin = () => {
    const { trackingState, dispatchApp, appState } = useContext(AppContext);    
    let history = useHistory();
    useTrackingLayer();
    const [disabled, setDisabledState] = useState(true);
    const [termsChecked, checkTerms] = useState(false);
    const [validEmail, setEmailReady] = useState(false);
    const [showInputError, toggleError] = useState(false);
    const email_input_el = useRef();

    const [ offerData, error, loading ] = useOfferFinder();
    
    const checkValidity = () => {
        let email = email_input_el.current.value;
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toggleError(false);
            setEmailReady(true);
            checkTerms(true);
        } else { setEmailReady(false) };
    };
    const [addUserEmail] = useMutation(ADD_USER_EMAIL);

    const checkForDirectLink = () => {
        if(offerData.offer_page === 'direct_link') {
            window.open(offerData.url);
            if(offerData.jump !== 'N/A') {
                window.location.href = offerData.jump;
                return;
            };
            history.push('/verticals');
            return;
        };
        history.push('/offers');
        return;
    };

    const handleOptOut = () => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        window.scrollTo(0, 0);
        checkForDirectLink();
    };
    
    const handleSubmit = () => {
        let emailValue = email_input_el.current.value;
        if(!disabled) {
            dispatchApp({ type: 'EMAIL_OPT_IN', payload: emailValue });
            addUserEmail({ variables: { clickId: Number(trackingState.hsid), email: emailValue }});
            window.scrollTo(0, 0);
            checkForDirectLink();
        };
        toggleError(true);
    };

    const toggleTerms = () => {
        checkTerms(!termsChecked);
    };

    useEffect(() => {
            if(validEmail && termsChecked) {
                setDisabledState(false);
                return;
            };

        return () => setDisabledState(true);
        // eslint-disable-next-line
    }, [validEmail, termsChecked]);

    if(error) {
        history.push('/error');
        return;
    };

    if(loading) {
        return <LoadingWave />
    };

    return (
        <FlowPage showCrumbs={appState.provider !== 'pch'}>
            <div className={`${appState.showExpansion ? 'padded-top' : ''} email-content flow-content`}>
                {!appState.showExpansion && <CloseFlow />}
                <div className='email-optin-container'>
                    <div className='email-optin-card'>
                        <div className='email-optin-text'>Would you like to receive relevant credit offers from <b><em>The Card Note</em></b> and <b><em>Card Matcher</em></b> directly to your inbox?</div>                    
                            <form className='email-form-container'>
                                {showInputError && (<div className='input-error'>Please enter a valid email address</div>)}
                                <input id='email-optin-input' 
                                    className='optin-input-field'
                                    onChange={checkValidity}
                                    type='email'
                                    ref={email_input_el} 
                                    placeholder='Email Address'
                                    />
                                <div className='email-terms-container'>
                                    <input className='email_terms_box' type='checkbox' checked={termsChecked} name='email_terms' onChange={toggleTerms}/>
                                    <div className='email_terms_text'>
                                        I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's  
                                        <a className='email_terms_links' href='/terms' target='_blank'>
                                            Terms &amp; Conditions
                                        </a> and <a className='email_terms_links' href='/privacy' target='_blank'>
                                            Privacy Policy
                                        </a>.
                                    </div>
                                </div>
                                <div className='email-button-group'>
                                    <Button className={`email_submit-button ${!termsChecked && 'disabled'}`} variant='contained' color='primary' onClick={handleSubmit} disabled={disabled}>
                                        <span className='button-text' >Next</span>
                                        <FontAwesomeIcon
                                            icon={['fal', 'angle-double-right']}
                                            className='next-button-icon'
                                        />
                                    </Button>
                                    <Button className='no-thanks' onClick={handleOptOut}>
                                        No Thanks
                                    </Button>
                                </div>
                            </form>                        
                    </div>            
                </div>
            </div>
        </FlowPage>
    )
};

export default EmailOptin;