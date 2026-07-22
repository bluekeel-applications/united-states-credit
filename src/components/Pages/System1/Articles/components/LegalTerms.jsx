import React from 'react';
import styles from '../Articles.css.js';
import { useMediaQuery } from 'react-responsive';

const LegalTerms = ({email}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const legalStyle = Object.assign({},
        styles.legalTerms,
        isMobile && styles.legalTermsMobile
    );

    return (
        <div style={legalStyle}>
            <div style={styles.termsText}>
                {`By clicking any of the links above, I agree with the `}
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
};

export default LegalTerms;