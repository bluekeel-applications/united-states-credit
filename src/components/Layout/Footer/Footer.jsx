import React from 'react';
import People from '../../../assets/Images/people.png';
import UscLogoGray from '../../../assets/Images/usc_logo_gray.png';
import styles from './Footer.css.js';
import Radium from 'radium';

const Footer = () => {
    const domain = 'UnitedStatesCredit';

    const scrollToTop = () => {
        window.scrollTo(0,0);
    };

    const LinkList = () => (
        <>
            <a key='footer-link-1' style={styles.link} href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank' onClick={scrollToTop}>Privacy Policy</a>
                <div className='delimiter'>|</div>
            <a key='footer-link-2' style={styles.link} href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank' onClick={scrollToTop}>Terms and Conditions</a>
                <div className='delimiter'>|</div>
            <a key='footer-link-3' style={styles.link} href='http://submit.bk-opt-out.com/unsub/VdjOmOF3gcfQW6ONkarM6GoTTH2iRdeBfoo7y6zBPb6oQnuoqxx2l8KrwMbVnCxq'>Unsubscribe</a>
                <div className='delimiter'>|</div>
            <a key='footer-link-4' style={styles.link} href={`mailto:info@${domain}.com`}>Contact Us</a>
        </>
    )

    return (
        <div style={styles.mainContainer}>
            { domain === 'UnitedStatesCredit' && (
                <div style={styles.peopleContainer}>
                    <img src={People} alt='footer-people' style={styles.peopleImage}/>
                </div>
            )}
            <div style={styles.contentContainer}>
                <img src={UscLogoGray} alt='footer-logo' style={styles.logo}/>
            </div>
            <div style={styles.linkContainer}>
                <LinkList/>
            </div>
            <div style={styles.messageContainer} key='footer-message-1'>
                {`${domain} is an Internet property of BlueKeel LLC, an independent 
                third party marketing company that connects consumers with third party companies. 
                ${domain} does not itself provide credit lending services. ${domain} 
                is not affiliated with, and this website has not been approved by, any agency of the 
                Federal Government.`}
            </div>
            <div style={styles.messageContainer} key='footer-message-2'>
                &copy; 2025 ALL RIGHTS RESERVED
            </div>
        </div>
    )
};

export default Radium(Footer);