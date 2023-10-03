import React, { useState } from 'react';
import styles from './EmailCapture.css.js';
import FormSubmit from './FormSubmit';
import LegalTerms from './LegalTerms';
import EmailInput from './EmailInput';
import Radium from 'radium';

const EmailCapture = ({ setPage, email, setEmail, theme, setSubmission }) => {

    const [ disabled, setDisabledState ] = useState(email === '');

    const handleReadyChange = () => {
        setDisabledState(false);
    };
    const handleSubmitClick = (e) => {
        e.preventDefault();
        setSubmission(true);
        setPage('offer');
        return;
    };

    const handleOptOutClick = (e) => {
        e.preventDefault();
        setSubmission(true);
        setEmail('');
        setPage('offer');
        return;
    };

    return (
        <div key='email-capture' style={styles.contentContainer}>
            <div key='email-form' style={styles.formCard}>
                <div key='email-form-text' style={styles.formText}>
                    Would you like to receive relevant credit offers from 
                    <b><em>The Card Note</em></b> and 
                    <b><em> Card Matcher </em></b> 
                    directly to your inbox?
                </div>     
                <form style={styles.formEl}>                                
                    <EmailInput
                        email={email}
                        setEmail={setEmail}
                        setEmailReady={handleReadyChange}
                    />
                    <LegalTerms disabled={disabled} />
                    <FormSubmit
                        disabledState={disabled}
                        onSubmit={(e) => handleSubmitClick(e)}
                        onOptOut={(e) => handleOptOutClick(e)}
                        theme={theme}
                    />
                </form>
            </div>
        </div>
    )
};

export default Radium(EmailCapture);