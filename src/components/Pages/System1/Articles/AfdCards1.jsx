import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const AfdCards1 = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                If you have bad credit, there are still credit card options available in 2024 that can help you rebuild your score while offering some basic benefits. One popular choice is secured credit cards, which require a refundable deposit that typically acts as your credit limit. Examples include the Discover it® Secured Credit Card, which offers cashback rewards, and the Capital One Platinum Secured, known for its flexible deposit options.
                </div>
            </div>
            {!!page.offer1.offer_url && (
                <RecommendBox
                    mainTitle={page.offer1.main_title}
                    titleText={page.offer1.sub_title}
                    text={page.offer1.sub_text}
                    offerUrl={page.offer1.offer_url}
                    cta={page.offer1.cta}
                    location='top'
                />
            )}
            <div style={styles.contentContainer}>
                <ContentText text='For those seeking unsecured cards, the Indigo® Platinum Mastercard® and Credit One Bank® Platinum Visa® are designed for individuals with less-than-perfect credit. These cards usually come with higher interest rates and lower credit limits, but responsible use can improve your credit score over time.' />
            </div>
            <div style={styles.contentContainer}>
                <ContentText text='Additionally, look for cards with no annual fee or low fees to minimize costs while you work on improving your credit. Paying your balance in full each month and maintaining a low credit utilization ratio are key to rebuilding credit effectively.' />
            </div>
            {!!page.offer2.offer_url && (
                <RecommendBox
                    mainTitle={page.offer2.main_title}
                    titleText={page.offer2.sub_title}
                    text={page.offer2.sub_text}
                    offerUrl={page.offer2.offer_url}
                    cta={page.offer2.cta}
                    location='bottom'
                />
            )}
        </div>
    );
};

export default AfdCards1;