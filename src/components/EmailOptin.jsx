import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../context';
import OptinButton from './OptinButton';
import { useHistory } from 'react-router-dom';

const EmailOptin = () => {
    const { dispatchApp } = useContext(AppContext);    
    let history = useHistory();
    const [showInput, toggleInput] = useState(false);
    const [termsChecked, checkTerms] = useState(false);

    const email_input_el = useRef();
    const terms_input_checkbox = useRef();

    const opt_IN = () => {
        toggleInput(true);
    };

    const handleSubmit = () => {
        let emailValue = email_input_el.current.value;
        let termsValue = terms_input_checkbox.current.value;
        if(termsValue) {
            dispatchApp({ type: 'EMAIL_OPT_IN', payload: emailValue });
            history.push('/offers');
        }
    };

    const opt_OUT = () => {
        dispatchApp({ type: 'EMAIL_OPT_OUT' });
        history.push('/offers');
    };

    const toggleTerms = () => {
        checkTerms(!termsChecked);
    };

    return (
        <div className='email-optin-container' fluid>
            <div className='email-optin-card'>
                <div className='email-optin-text'>Would you like to receive relevant credit offers from <b><em>The Card Note</em></b> and <b><em>Card Matcher</em></b> directly to your inbox?</div>
                    <div className='email-optin-buttons'>
                        <OptinButton
                            color='light_blue'
                            value='Yes, please!'
                            handleClick={opt_IN}
                            isEmail
                            disabled={showInput}
                        />
                        <OptinButton
                            color='blue'
                            value={showInput ? 'Nevermind':'Not interested'}
                            handleClick={opt_OUT}
                            isEmail
                        />
                    </div>
                {showInput && (
                    <form className='email-form-container'>
                        <input id='email-optin-input' 
                            className='optin-input-field' 
                            type='email'
                            ref={email_input_el} 
                            placeholder='Email Address' 
                            autoComplete 
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
                            <button className={`email_submit-button ${!termsChecked && 'disabled'}`} onClick={handleSubmit}>
                                Next
                            </button>
                        </div>
                    </form>
                )}
            </div>            
        </div>
    )
};

export default EmailOptin;