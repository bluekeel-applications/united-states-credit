import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import styles from './EmailCapture.css.js';

const LegalTerms = ({ disabled }) => {
    const [ checked, setChecked ] = useState(!disabled);

    useEffect(() => {
        setChecked(!disabled);
    }, [disabled]);

    const handleCheckboxChange = () => {
        setChecked(!disabled);
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
                I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's
                <Link 
                    key='terms-link-1'
                    style={styles.termsLinks} 
                    to='/terms' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    {` Terms & Conditions `}
                </Link> 
                and 
                <Link 
                    key='terms-link-2'
                    style={styles.termsLinks} 
                    to='/privacy' 
                    rel='noopener noreferrer' 
                    target='_blank'
                >
                    {` Privacy Policy `}
                </Link>.
            </div>
        </div>
    );
}

export default Radium(LegalTerms);