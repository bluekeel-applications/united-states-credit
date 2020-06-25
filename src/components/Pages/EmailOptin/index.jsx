import React, { useContext, useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import FlowPage from '../../Layout/FlowPage';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_EMAIL, INSERT_COMMON_INFO, INSERT_OFFER_LOG } from '../../../utils/mutations';
import CloseFlow from '../../Shared/CloseFlow';
import Loading from '../../Shared/Loading';
import useOfferFinder from '../../../hooks/useOfferFinder';
import useTrackingLayer from '../../../hooks/useTrackingLayer';
import MoveToOfferButtons from './MoveToOfferButtons';
import DirectLinkButtons from './DirectLinkButtons';
import { firePixelBlueKeel, firePixelBing, firePixelGoogle } from '../../../utils/pixels';

const EmailOptin = () => {
    const { trackingState, dispatchApp, appState } = useContext(AppContext);
    let essentials = appState.flowState.vertical && appState.flowState.loan_type;  
    let history = useHistory();
    useTrackingLayer();
    const [disabled, setDisabledState] = useState(!appState.pch.email);
    const [termsChecked, checkTerms] = useState(!!appState.pch.email);
    const [validEmail, setEmailReady] = useState(!!appState.pch.email);
    const [showInputError, toggleError] = useState(false);
    const [emailValue, setEmail] = useState(`${appState.pch.email ? appState.pch.email : ''}`);
    const [ data, error, loading ] = useOfferFinder();
    const [offer, setOffer] = useState(null);
    const hasSent = useRef(false);
    const hasLogged = useRef(false);
    const [offerPage, setOfferPage] = useState('');
	
	const checkValidity = (email) => {
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toggleError(false);
            setEmailReady(true);
            checkTerms(true);
            setDisabledState(false);
        } else { setEmailReady(false); };
    };

    const handleInputChange = (event) => {
        let email = event.target.value;
        setEmail(email);
        checkValidity(email);
    };

    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL);
    const [ insertCommonInfo ] = useMutation(INSERT_COMMON_INFO);
    const [ insertServiceLog ] = useMutation(INSERT_OFFER_LOG);

    useEffect(() => {
        if(!essentials) {
            history.push('/');
            return;
        };

        if(data) {
            const { id, offer_page } = data.fetchEndpointOffer.body;
            setOffer(data.fetchEndpointOffer.body);
            setOfferPage(offer_page);
            dispatchApp({ type: 'SELECTED_OFFER', payload: data.fetchEndpointOffer.body });
            if(!hasLogged.current) {
				console.log('offer:', data.fetchEndpointOffer.body);
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
        return (
            <FlowPage showCrumbs={appState.showStory}>
                <div className={`${appState.showExpansion || !appState.showStory ? 'padded-top' : ''} email-content flow-content`}>
                    {!appState.showExpansion && <CloseFlow />}
                    <div className='email-optin-container'>
                        <Loading />
                    </div>
                </div>
            </FlowPage>
        )
    };

    const processClick = async() => {
        dispatchApp({ type: 'HIDE_EXPANSION' });
        window.scrollTo(0, 0);
        if(!hasSent.current) {
            hasSent.current = true;
            firePixelBlueKeel(trackingState.hsid);
            firePixelBing(appState.flowState.vertical);
			firePixelGoogle();
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
                                    InputProps={{
										autoFocus: true,
										onChange: handleInputChange,
										value: emailValue,
										error: showInputError,
										type: 'email'
									}}
                                    inputProps={{ 'aria-label': 'email-optin-input' }}
                                    fullWidth                                    
                                />
                                <div className='email-terms-container'>
                                    <input className='email_terms_box' type='checkbox' checked={termsChecked} name='email_terms' onChange={() => checkTerms(!termsChecked)}/>
                                    <div className='email_terms_text'>
                                    I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's  
                                        <a className='email_terms_links' href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank'>
                                        Terms &amp; Conditions
                                        </a> and <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                                            Privacy Policy
                                        </a>.
                                    </div>
                                </div>
                                {offerPage === 'direct_link' ? 
									<DirectLinkButtons 
										disabledState={disabled}
										termsChecked={termsChecked}
										toggleError={toggleError}
										offer={offer}
										sendEmail={sendEmailToDB}
										processClick={processClick}
									/> 
									: 
									<MoveToOfferButtons 
										disabledState={disabled}
										termsChecked={termsChecked}
										toggleError={toggleError}
										sendEmail={sendEmailToDB}
										processClick={processClick}
									/>
								}
                            </form>
                    </div>            
                </div>
            </div>
        </FlowPage>
    )
};

export default EmailOptin;