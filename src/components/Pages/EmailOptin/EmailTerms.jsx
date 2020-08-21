import React, { useState } from 'react';
import { useEffect } from 'react';

const EmailTerms = ({ disabled }) => {
    const [checked, setChecked] = useState(!disabled);

    useEffect(() => {
        setChecked(!disabled);
    }, [disabled]);

    const handleCheckboxChange = () => {
        setChecked(!disabled);
    };

    return (
        <div className='email-terms-container'>
            <input
                className='email_terms_box'
                type='checkbox'
                checked={checked}
                name='email_terms'
                onChange={handleCheckboxChange}
            />
            <div className='email_terms_text'>
                I hereby declare that I am a U.S. resident over the age of 18 and I agree to this site's
                <a className='email_terms_links' href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank'>
                    Terms &amp; Conditions
                </a> and <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                    Privacy Policy
                </a>.
            </div>
        </div>
    );
}

export default EmailTerms;