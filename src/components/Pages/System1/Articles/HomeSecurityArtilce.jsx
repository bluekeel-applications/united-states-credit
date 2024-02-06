import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';

const ContentText = ({title, text}) => (
    <div style={styles.contentText}>
        {!!title && <b style={styles.boldText}>{`${title} - `}</b>}{text}
    </div>
);

const HomeSecurityArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                In an ever-changing world, ensuring the safety and security of our homes has become a paramount concern. With advancements in technology, home security systems have become an essential tool for protecting our loved ones and our valuable belongings. In this article, we will explore the significance of home security systems, delve into the different types available, and provide useful tips to help you select the best system for your specific needs.
                </div>
            </div>
            
            <div style={styles.contentContainer}>
                <ArticleTitle text='The Importance of Home Security Systems:'/>
                <ContentText title='1. Deterrence' text='Home security systems act as a visible deterrent to potential intruders. The presence of security cameras, alarms, and other monitoring devices can discourage burglars from targeting your property.' />
                <ContentText title='2. Protection' text='Home security systems provide real-time alerts, enabling quick responses to potential threats. They help minimize the risk of break-ins, vandalism, and other criminal activities by notifying homeowners and authorities promptly.' />
                <ContentText title='3. Peace of Mind' text='Knowing that your home is equipped with a reliable security system can significantly reduce anxiety and fear, allowing you and your family to feel safe and secure within your own living space.' />
                <ContentText title='4. Remote Monitoring' text="Modern home security systems often offer remote monitoring capabilities, enabling homeowners to check their property's status and receive alerts through smartphone apps or online platforms. This feature provides a sense of control and awareness even when you're away." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Types of Home Security Systems:'/>
                <ContentText title='1. Alarm Systems' text='These systems are designed to detect unauthorized entry through sensors placed on doors and windows. When triggered, they produce loud sirens to alert homeowners and scare off potential intruders.' />
                <ContentText title='2. Surveillance Cameras' text='Video surveillance systems capture visual evidence of activities in and around your home. They come in various types, such as wired or wireless, indoor or outdoor, and can be accessed remotely for live viewing or recording.' />
                <ContentText title='3. Motion Sensors' text='These devices detect movement within a specific range and trigger an alarm or notification. They are particularly useful in large areas or outdoor spaces.' />
                <ContentText title='4. Access Control Systems' text="These systems restrict access to your property, utilizing technologies such as smart locks, keypads, or biometric scanners to ensure only authorized individuals can enter." />
                <ContentText title='5. Smart Home Integration' text="Modern home security systems often integrate with smart home devices, allowing you to control and monitor security features through voice commands or mobile apps." />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Tax Resolution'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='Tips for Choosing the Best Home Security System:'/>
                <ContentText title='1. Assess Your Needs' text="Identify your specific security requirements, considering factors like the size of your property, the crime rate in your area, and any specific vulnerabilities or concerns." />
                <ContentText title='2. Research and Compare' text="Explore different home security brands and their offerings. Read customer reviews, evaluate features, and compare prices to find the system that best fits your budget and requirements." />
                <ContentText title='3. Professional Installation vs. DIY' text="Decide whether you prefer professional installation or a do-it-yourself approach. Professional installation ensures optimal system setup, while DIY options can be more cost-effective and flexible." />
                <ContentText title='4. Consider Monitoring Services' text="Decide whether you want professional monitoring services that alert authorities in case of emergencies. Some systems offer self-monitoring options, while others require subscription plans for professional monitoring." />
                <ContentText title='5. Scalability and Expansion' text="Consider the future scalability and expandability of the system. Ensure it can accommodate additional devices or features as your security needs evolve." />
                <ContentText title='6. Seek Expert Advice' text="Consult security professionals or seek recommendations from trusted sources to gain insights into the most reliable and effective home security systems in the market." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Wrapping it all up:'/>
                <ContentText text="Investing in a home security system is an investment in the safety and well-being of your family and your home. By deterring potential intruders, providing real-time alerts, and offering peace of mind, these systems play a crucial role in safeguarding your property. By understanding the various types of home security systems available and following the tips provided." />
            </div>
        </div>
    );
};

export default HomeSecurityArticle;