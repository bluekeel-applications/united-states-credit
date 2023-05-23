import React from 'react';
import Radium from 'radium';
import styles from './OptInESP.css.js';

const Terms2 = ({ checked, setChecked }) => {

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <div key='email-optin-terms' style={styles.termsContainer}>
            <input
                key='terms-checkbox'
                style={styles.termsBox} 
                type='checkbox' 
                checked={checked} 
                name='email_terms'
                onChange={handleCheckboxChange}
            />
            <div key='terms-text' style={styles.termsText}>
                I understand by submitting my email address that I will receive daily email from UnitedStatesCredit.
            </div>
        </div>
    );
}

export default Radium(Terms2);