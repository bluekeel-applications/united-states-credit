import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText.jsx';
import RecommendBox from './components/RecommendBox.jsx';

const MortgageArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return (
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Finding the Best Mortgage Rate'/>
                <ContentText text='The journey to securing the best mortgage rate begins with a thorough assessment of your financial health. Lenders evaluate factors such as credit score, debt-to-income ratio, and the size of the down payment when determining your eligibility and rate. A stronger financial profile can lead to more favorable rates. Here are key strategies to help you find the best mortgage rate:' />
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
                <ContentText title='1. Pre-Approval:' text="Start with getting pre-approved by a lender, which gives you a clear idea of what you might qualify for based on your financial situation and strengthens your position in home negotiations." />
                <ContentText title='2. Shop Around:' text="Explore rates from various lenders, including traditional banks, credit unions, and online entities. Each lender may offer different rates and terms that could be more advantageous." />
                <ContentText title='3. Consider Loan Types:' text="Weigh the pros and cons of fixed-rate versus adjustable-rate mortgages. Fixed-rate mortgages provide payment stability, while adjustable-rate mortgages may offer lower initial rates." />
                <ContentText title='4. Negotiate:' text="Don’t hesitate to negotiate the terms and rates. Lenders sometimes have flexibility, and competing offers can be leveraged to secure better terms." />
                <ContentText title='5. Rate Lock:' text="Once a favorable rate is identified, consider locking it in to protect against future market fluctuations during the loan process." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Buying Down Your Mortgage APR'/>
                <ContentText text="Reducing your mortgage APR through the purchase of discount points is a strategy that can lead to significant savings over the loan's life. This involves paying an upfront fee to secure a lower interest rate, which can affect your long-term financial planning. Understanding how banks price this option is crucial:" />
            </div>
            <div style={styles.contentContainer}>
                <ContentText title='1. Discount Points:' text="One point typically costs 1% of your loan amount and can reduce your rate by a predetermined amount, often around 0.25%. The exact impact varies based on market conditions, loan type, and lender policies." />
                <ContentText title='2. Break-Even Analysis:' text="Calculate the break-even point where the savings from the lower interest rate surpass the upfront cost of buying points. This is crucial for determining the financial viability of this strategy." />
                <ContentText title='3. Long-Term Ownership:' text="The benefits of buying down your rate are more pronounced for those planning to stay in their homes for many years, as the initial cost can be recouped over time through reduced interest payments." />
                <ContentText title='4. Negotiation and Budget Consideration:' text="The cost and terms of buying down your rate can sometimes be negotiated. Ensure that you have sufficient funds for the down payment and other expenses, without depleting your resources on discount points alone" />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Making an Informed Decision'/>
                <ContentText text="Navigating mortgage rates and deciding whether to buy down your APR involve careful consideration of your financial situation and long-term housing plans. By understanding your financial health, exploring and comparing lender offers, and calculating the long-term benefits of lower interest rates, you can make informed decisions that optimize your financial wellbeing." />
                <ContentText text="Engage with financial advisors or mortgage professionals to delve deeper into your options, ensuring that your path to homeownership is both financially prudent and aligned with your personal goals. With the right approach, you can secure a mortgage that not only fits your budget but also supports your long-term financial health." />
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
}

export default MortgageArticle;