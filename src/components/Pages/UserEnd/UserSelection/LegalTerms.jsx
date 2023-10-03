import React from 'react';
import styles from './UserSelection.css.js';
import Radium from 'radium';

const LegalTerms = ({ email, hasInput }) => (
    <div style={styles.legalTerms}>
        <div style={styles.termsText}>
            {hasInput ? 
            'By clicking “Next” button below or any of the links above, I agree with the ' : 
            'By clicking any of the links above, I agree with the '
            }
            <a 
                key='terms-privacy-policy-1'
                style={styles.termsLink}
                href='https://unitedstatescredit.com/privacy' 
                rel='noopener noreferrer' 
                target='_blank'
            >
                Privacy Policy
            </a>
            {` and `}
            <a 
                key='terms-policy'
                style={styles.termsLink} 
                href='https://unitedstatescredit.com/terms' 
                rel='noopener noreferrer' 
                target='_blank'
            >
                Terms &amp; Conditions</a>.
            {` In addition, I consent to receive emails ${email && email !== 'omit' ? `to ${email}` : ''}
            in accordance with the `}
            <a 
                key='terms-privacy-policy-2'
                style={styles.termsLink} 
                href='https://unitedstatescredit.com/privacy' 
                rel='noopener noreferrer' 
                target='_blank'
            >
                Privacy Policy
            </a>.
        </div>
    </div>
);

export default Radium(LegalTerms);