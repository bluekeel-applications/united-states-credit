import React, { memo } from 'react';
import Radium from 'radium';
import styles from './EmailCapture.css.js';

const LegalTerms = Radium(({ checked, setChecked }) => (
        <div key='email-optin-terms' style={styles.termsContainer}>
            <input
                key='terms-checkbox'
                style={styles.termsBox} 
                type='checkbox' 
                checked={checked} 
                name='email_terms'
                onChange={setChecked}
            />
            <div key='terms-text' style={styles.termsText}>
            I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's 
                <a 
                    key='terms-policy'
                    style={styles.termsLinks} 
                    href='https://unitedstatescredit.com/terms' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    Terms &amp; Conditions
                </a> 
                <> and </> 
                <a 
                    key='terms-privacy-policy-1'
                    style={styles.termsLinks}
                    href='https://unitedstatescredit.com/privacy' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    Privacy Policy
                </a>.
            I also agree to receive relevant email from UnitedStatesCredit and affiliated brands that may be of interest to me.
            </div>
        </div>
    )
);

export default memo(LegalTerms);