import React from 'react';

const EmailTerms = ({ email }) => (
    <div className='email-terms-container'>
        <div className='email_terms_text'>
            {`By clicking “Next” button below or any of the links above, I agree with the `}
            <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                Privacy Policy
            </a>
            {` and `}
            <a className='email_terms_links' href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank'>
                Terms &amp; Conditions</a>.
            {` In addition, I consent to receive emails ${email ? `to ${email}` : ''}
            in accordance with the `}
            <a className='email_terms_links' href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank'>
                Privacy Policy
            </a>.
        </div>
    </div>
);

export default EmailTerms;