import React, { memo } from 'react';
import Radium from 'radium';
import styles from './UserCapture.css.js';

const LegalTerms = Radium(({ checked, setChecked }) => (
    <div style={styles.termsContainer}>
        <input
            key="terms-checkbox"
            style={styles.termsBox} 
            type="checkbox" 
            checked={checked} 
            name="terms"
            onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={styles.termsText}>
            I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's 
            <a 
                key="terms-link"
                style={styles.termsLinks} 
                href="https://unitedstatescredit.com/terms" 
                rel="noopener noreferrer" 
                target="_blank"
            >
                Terms &amp; Conditions
            </a> 
            <> and </> 
            <a 
                key="privacy-link"
                style={styles.termsLinks}
                href="https://unitedstatescredit.com/privacy" 
                rel="noopener noreferrer" 
                target="_blank"
            >
                Privacy Policy
            </a>.
            I also agree to receive relevant email from UnitedStatesCredit and affiliated brands that may be of interest to me.
        </div>
    </div>
));

export default memo(LegalTerms); 