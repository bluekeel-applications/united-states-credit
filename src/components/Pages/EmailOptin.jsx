import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Breadcrumbs from '../Breadcrumbs';

const EmailOptin = () => {
    const { dispatchApp } = useContext(AppContext);    
    let history = useHistory();
    const [disabled, setReadyState] = useState(true);
    const [termsChecked, checkTerms] = useState(false);
    const [validEmail, setEmailReady] = useState(false);
    const [showInputError, toggleError] = useState(false);
    const email_input_el = useRef();

    const checkValidity = () => {
        let email = email_input_el.current.value;
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toggleError(false);
            setEmailReady(true);
        } else { setEmailReady(false) };
    };

    const handleSubmit = () => {
        let emailValue = email_input_el.current.value;
        if(termsChecked && validEmail) {
            dispatchApp({ type: 'EMAIL_OPT_IN', payload: emailValue });
            history.push('/offers');
        };
        toggleError(true);
    };

    const toggleTerms = () => {
        checkTerms(!termsChecked);
        setReadyState(!disabled);
    };

    return (
        <>
        <Breadcrumbs />
        <Zoom>
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
                                <input className='email_terms_box' type='checkbox' name='email_terms' onClick={toggleTerms}/>
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
                                <Button block className={`email_submit-button ${!termsChecked && 'disabled'}`} onClick={handleSubmit} disabled={disabled}>
                                    <span className='button-text' >Next</span>
                                    <FontAwesomeIcon
                                        icon={['fal', 'angle-double-right']}
                                        className='next-button-icon'
                                    />
                                </Button>
                                <Button variant='link' className='no-thanks' onClick={() => history.push('/offers')}>
                                    No Thanks
                                </Button>
                            </div>
                        </form>                        
                </div>            
            </div>
        </Zoom>
        </>
    )
};

export default EmailOptin;