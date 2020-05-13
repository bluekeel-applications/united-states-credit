import React, { useContext, useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import FlowPage from '../Layout/FlowPage';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_COMMON_INFO, INSERT_OFFER_LOG } from '../../utils/mutations';
import CloseFlow from '../Shared/CloseFlow';
import Loading from '../Shared/Loading';
import useOfferFinder from '../../hooks/useOfferFinder';
import useTrackingLayer from '../../hooks/useTrackingLayer';
import { buildFullLink } from '../../utils/helpers';

const EmailOptin = () => {
    const { trackingState, dispatchApp, appState } = useContext(AppContext);
    let essentials = appState.flowState.vertical && appState.flowState.loan_type;  
    let history = useHistory();
    useTrackingLayer();
    const [disabled, setDisabledState] = useState(true);
    const [termsChecked, checkTerms] = useState(false);
    const [validEmail, setEmailReady] = useState(false);
    const [showInputError, toggleError] = useState(false);
    const [emailValue, setEmail] = useState('');
    const [ data, error, loading ] = useOfferFinder();
    const [offer, setOffer] = useState(null);
    const hasSent = useRef(false);
    const hasLogged = useRef(false);
    const [offerPage, setOfferPage] = useState('');
    const checkValidity = (event) => {
        let email = event.target.value;
        setEmail(email);
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toggleError(false);
            setEmailReady(true);
            checkTerms(true);
            setDisabledState(false);
        } else { setEmailReady(false); };
    };

    const [addUserEmail] = useMutation(ADD_USER_EMAIL);
    const [insertCommonInfo] = useMutation(INSERT_COMMON_INFO);
    const [ insertServiceLog ] = useMutation(INSERT_OFFER_LOG);

    useEffect(() => {
        if(!essentials) {
            history.push('/');
            return;
        };

        if(data) {
            console.log('offer:', data.fetchEndpointOffer.body);
            const { id, offer_page } = data.fetchEndpointOffer.body;
            setOffer(data.fetchEndpointOffer.body);
            setOfferPage(offer_page);
            if(!hasLogged.current) {
                insertServiceLog({ 
                    variables: { 
                        clickData: { 
                            endpoint_id: id, 
                            clickId: Number(trackingState.hsid) 
                        }
                    }
                });
                hasLogged.current = true;
            };
        };

        if(validEmail && termsChecked) {
            setDisabledState(false);
            return;
        };

        return () => setDisabledState(true);
        // eslint-disable-next-line
    }, [validEmail, termsChecked, data]);

    if(error) {
        console.log('error:', error);
        history.push('/error');
        return;
    };

    if(loading) {
        return <Loading />
    };

    const processClick = async() => {
        dispatchApp({ type: 'HIDE_EXPANSION' });
        window.scrollTo(0, 0);
        if(!hasSent.current) {
            hasSent.current = true;
            insertCommonInfo({ 
                variables: { 
                    visitor: {
                        'hsid': Number(trackingState.hsid),
                        'oid': Number(trackingState.oid),
                        'eid': trackingState.eid,
                        'sid': Number(trackingState.sid),
                        'uid': trackingState.uid,
                        'ip_address': trackingState.ip_address,
                        'email': emailValue
                    }
                } 
            });
        };
    };
    
    const sendEmailToDB = () => {
        dispatchApp({ type: 'EMAIL_OPT_IN', payload: emailValue });
        addUserEmail({ variables: { clickId: Number(trackingState.hsid), email: emailValue }});
    };

    const handleOptOut = async() => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        processClick();
        history.push('/offers');
        return;
    };

    const handleOptOutDirectLink = () => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        const newWindowLink = buildFullLink(offer.url, trackingState.sid, trackingState.eid);
        window.open(newWindowLink);
        processClick();
        if(offer && offer.jump !== 'N/A') {
            window.location.href = buildFullLink(offer.jump, trackingState.sid, trackingState.eid);
            return;
        };
        history.push('/verticals');
        return;
    };
    
    const handleEmailSubmit = async() => {
        if(!disabled) {
            sendEmailToDB();
            processClick();
            history.push('/offers');
            return;
        };
        toggleError(true);
    };


    const handleDirectLink = () => {
        const newWindowLink = buildFullLink(offer.url, trackingState.sid, trackingState.eid);
        if(!disabled) {
            window.open(newWindowLink);
            sendEmailToDB();
            processClick();
            if(offer && offer.jump !== 'N/A') {
                window.location.href = buildFullLink(offer.jump, trackingState.sid, trackingState.eid);
                return;
            };
            history.push('/verticals');
            return
        };
        toggleError(true);
    };

    const toggleTerms = () => {
        checkTerms(!termsChecked);
    };

    const OfferButtons = ({ disabledState }) => (
        <div className='email-button-group'>
            <Button className={`email_submit-button ${!termsChecked && 'disabled'}`} variant='contained' color='primary' onClick={handleEmailSubmit} disabled={disabledState}>
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
    );

    const DirectLinkButtons = ({ disabledState }) => (
        <div className='email-button-group'>
            <Button className={`email_submit-button ${!termsChecked && 'disabled'}`} variant='contained' color='primary' onClick={handleDirectLink} disabled={disabledState}>
                <span className='button-text' >Next</span>
                <FontAwesomeIcon
                    icon={['fal', 'angle-double-right']}
                    className='next-button-icon'
                />
            </Button>
            <Button className='no-thanks' onClick={handleOptOutDirectLink}>
                No Thanks
            </Button>
        </div>
    );

    const input_props = {
        autoFocus: true,
        onChange: checkValidity,
        value: emailValue,
        error: showInputError,
        type: 'email'
    }

    return (
        <FlowPage showCrumbs={appState.showStory}>
            <div className={`${appState.showExpansion || !appState.showStory ? 'padded-top' : ''} email-content flow-content`}>
                {!appState.showExpansion && <CloseFlow />}
                <div className='email-optin-container'>
                    <div className='email-optin-card'>
                        <div className='email-optin-text'>Would you like to receive relevant credit offers from <b><em>The Card Note</em></b> and <b><em>Card Matcher</em></b> directly to your inbox?</div>                    
                            <form className='email-form-container'>                                
                                <TextField 
                                    id='email-optin-input' 
                                    label='Email Address' 
                                    variant='outlined'
                                    InputProps={input_props}
                                    inputProps={{ 'aria-label': 'email-optin-input' }}
                                    // value={emailValue}
                                    // onChange={checkValidity}
                                    // error={showInputError}
                                    // type='email'
                                    fullWidth                                    
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
                                {offerPage === 'direct_link' ? <DirectLinkButtons disabledState={disabled} /> : <OfferButtons disabledState={disabled} />}
                            </form>
                    </div>            
                </div>
            </div>
        </FlowPage>
    )
};

export default EmailOptin;