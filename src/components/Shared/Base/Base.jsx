import React from 'react';
import styles from './Base.css.js';
import UscFullLogo from '../../../assets/Images/usc_full_logo.png';
import Radium from 'radium';
const Base = () => {

    const scrollToTop = () => {
        window.scrollTo(0,0);
    };

    const domain = 'UnitedStatesCredit';

    const LinkList = () => (
        <>
            <a key='footer-link-1' style={styles.link} href='https://unitedstatescredit.com/privacy' rel='noopener noreferrer' target='_blank' onClick={scrollToTop}>Privacy Policy</a>
                <div style={styles.delim} className='delimiter'>|</div>
            <a key='footer-link-2' style={styles.link} href='https://unitedstatescredit.com/terms' rel='noopener noreferrer' target='_blank' onClick={scrollToTop}>Terms and Conditions</a>
                <div style={styles.delim} className='delimiter'>|</div>
            <a key='footer-link-3' style={styles.link} href='http://submit.bk-opt-out.com/unsub/VdjOmOF3gcfQW6ONkarM6GoTTH2iRdeBfoo7y6zBPb6oQnuoqxx2l8KrwMbVnCxq'>Unsubscribe</a>
                <div style={styles.delim} className='delimiter'>|</div>
            <a key='footer-link-4' style={styles.link} href={`mailto:info@${domain}.com`}>Contact Us</a>
        </>
    )

    const SectionHeader = ({text}) => (
        <div style={styles.sectionHeaderContainer}>
            <div style={styles.sectionHeadNub}></div>
            <div style={styles.sectionHeadText}>{text}</div>
        </div>
    )

    return (
    <div style={styles.baseContainer}>
        <div style={styles.contentContainer}>
            <div style={styles.topContainer}>
                <img src={UscFullLogo} alt='USC Logo' style={styles.logo} />
                <div style={styles.linkContainer}>
                    <LinkList />
                </div>
            </div>
            <div style={styles.break}></div>
            <div style={styles.bottomContainer}>
                <div style={styles.messageContainer}>
                UnitedStatesCredit is an Internet property of BlueKeel LLC, an independent third party marketing company that connects consumers with third party companies. UnitedStatesCredit does not itself provide credit lending services. UnitedStatesCredit is not affiliated with, and this website has not been approved by, any agency of the Federal Government.
                </div>
                <div style={styles.rightContainer}>
                    <div style={styles.contactUsContainer}>
                        <SectionHeader text='Questions?' />
                        <p style={styles.contactUsText}>At United States Credit, we pride ourselves on being the number one source of credit information for consumers. We are dedicated to providing the best possible experience for our users.
                        <a style={styles.contactUsLink} href={`mailto:info@${domain}.com`}>Contact us.</a>
                        </p>
                    </div>
                    <div style={styles.followUsContainer}>
                        <SectionHeader text='Follow Us' />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Radium(Base);