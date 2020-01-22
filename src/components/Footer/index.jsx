import React from 'react';

const Footer = () => {
    const renderLinkList = () => (
        <>
            <a className='footer-link' href='https://unitedstatescredit.com/privacy' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>
                <div className='delimiter'>|</div>
            <a className='footer-link' href='https://unitedstatescredit.com/terms' target='_blank' rel='noopener noreferrer'>Terms and Conditions</a>
                <div className='delimiter'>|</div>
            <a className='footer-link' href='http://submit.bk-opt-out.com/unsub/VdjOmOF3gcfQW6ONkarM6GoTTH2iRdeBfoo7y6zBPb6oQnuoqxx2l8KrwMbVnCxq'>Unsubscribe</a>
                <div className='delimiter'>|</div>
            <a className='footer-link' href='mailto:info@unitedstatescredit.com'>Contact Us</a>
        </>
    )

    return (
        <div className='footer-main-container'>
            <div className='people-img-container'>
                <img src='https://unitedstatescredit.com/images/people.png' alt='footer-people' className='people-img'/>
            </div>
            <div className='footer-content-container'>
                <img src='https://unitedstatescredit.com/images/logo_gray.png' alt='footer-logo' className='footer-logo'/>
            </div>
            <div className='footer-link-container'>
                {renderLinkList()}
            </div>
            <div className='footer-message-container'>
                UnitedStatesCredit is an Internet property of BlueKeel LLC, an independent third party marketing company that connects consumers with third party companies. UnitedStatesCredit does not itself provide credit lending services. UnitedStatesCredit is not affiliated with, and this website has not been approved by, any agency of the Federal Government.
            </div>
            <div className='footer-copyright-container'>
                &copy; 2020 ALL RIGHTS RESERVED
            </div>
        </div>
    )
};

export default Footer;