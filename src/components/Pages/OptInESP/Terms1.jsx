import React from 'react';
import Radium from 'radium';
import styles from './OptInESP.css.js';
import { Link } from 'react-router-dom';

const Terms1 = ({ checked, setChecked }) => {

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <div key='email-optin-terms' style={{...styles.termsContainer, marginTop: '30px'}}>
            <input
                key='terms-checkbox'
                style={styles.termsBox} 
                type='checkbox' 
                checked={checked} 
                name='email_terms'
                onChange={handleCheckboxChange}
            />
            <div key='terms-text' style={styles.termsText}>
                I agree that I am a U.S. resident, I am at least 18 years old, and I agree to the 
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

export default Radium(Terms1);