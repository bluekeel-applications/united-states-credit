import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const LifeInsuranceArticle = () => {
    const { trackingState, appState } = useContext(AppContext);
    const page = appState.system1;
    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                Life insurance is an essential financial tool that provides protection and peace of mind for individuals and their loved ones. It serves as a safety net, ensuring that financial responsibilities are met and loved ones are taken care of in the event of the policyholder's death. However, finding the right life insurance policy can be a complex and overwhelming process. In this article, we will discuss the importance of life insurance and provide guidance on how to find the policy that best suits your needs.
                </div>
            </div>
            {!!page.offer1.offer_url ? (
                <RecommendBox
                    mainTitle={page.offer1.main_title}
                    titleText={page.offer1.sub_title}
                    text={page.offer1.sub_text}
                    offerUrl={`${page.offer1.offer_url}`}
                    cta={page.offer1.cta}
                    location='top'
                />
            ) : (
                <RecommendBox
                    mainTitle="Editor's Choice: Access Today’s Top Life Insurance Offer"
                    titleText="Why we like it"
                    text="This offer caters to individuals looking to protect their families future and offers a variety of options based on your financial needs. The application process is speedy, uncomplicated, and direct."
                    offerUrl={`https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9840&pid=3577&eid=top-${trackingState.sid}&uid=yourUID`}
                    cta="ACCESS NOW"
                    location='top'
                />
            )}
            <div style={styles.contentContainer}>
                <ContentText text='The importance of life insurance cannot be overstated, especially for those who have dependents or financial obligations. Here are some key reasons why having life insurance is crucial:' />
                <ContentText title='1. Financial Security for Loved Ones' text="Life insurance offers financial protection to your loved ones in the event of your untimely demise. It provides a tax-free lump sum payment, known as the death benefit, to your beneficiaries. This money can be used to replace lost income, pay off debts, cover funeral expenses, or fund your children's education." />
                <ContentText title='2. Debt and Mortgage Repayment' text='If you have outstanding debts, such as a mortgage, car loan, or credit card debt, life insurance can ensure that your loved ones are not burdened with these financial obligations after you are gone. The death benefit can be used to pay off these debts, preventing your family from facing financial hardship.' />
                <ContentText title='3. Income Replacement' text='If you are the primary breadwinner in your family, life insurance can provide a source of income replacement. It can help your dependents maintain their current standard of living by replacing the income that would have been generated had you been alive.' />
                <ContentText title='4. Business Continuity' text='Life insurance is also crucial for business owners. It can help protect the continuity of a business by providing funds for buy-sell agreements, key person insurance, or covering outstanding business debts.' />
            </div>
            <div style={styles.contentContainer}>
                <ContentText text="Now that we understand the importance of life insurance, let's explore how to find the right policy:" />
                <ContentText title='1. Assess Your Needs' text="Begin by assessing your financial situation, current obligations, and future goals. Consider factors such as your age, income, dependents, outstanding debts, and long-term financial plans. This evaluation will help you determine the amount of coverage you need." />
                <ContentText title='2. Understand the Types of Life Insurance' text="Life insurance policies come in various forms, including term life insurance, whole life insurance, universal life insurance, and more. Each type has its own advantages and considerations. Educate yourself about the different options to determine which one aligns best with your needs and budget." />
                <ContentText title='3. Calculate the Coverage Amount' text="Use online calculators or seek advice from a financial professional to determine the appropriate coverage amount. Consider factors such as your income replacement needs, outstanding debts, future expenses (e.g., education for children), and funeral costs." />
                <ContentText title='4. Compare Quotes' text="Obtain quotes from multiple insurance providers to compare premiums and coverage terms. Online platforms and insurance agents can assist you in gathering and comparing quotes." />
                <ContentText title='5. Research Insurance Companies' text="Investigate the financial strength, reputation, and customer reviews of potential insurance companies. Choose a reputable and stable provider that has a track record of honoring claims and providing good customer service." />
                <ContentText title='6. Seek Professional Advice' text="Consult with a qualified insurance agent or financial advisor who specializes in life insurance. They can offer expert guidance based on your specific circumstances and help you navigate the complexities of insurance policies." />
                <ContentText title='7. Review Policy Terms' text="Carefully review the terms and conditions of the policy before making a final decision. Pay attention to factors such as premium rates, policy duration, exclusions, and any additional riders or benefits." />
                <ContentText title='8. Reassess Periodically' text="Life circumstances change over time, so it's important to review your life insurance coverage periodically. As you experience major life events like marriage, the birth of a child, or changes in your financial situation, you may need to adjust your coverage accordingly." />
            </div>
            <div style={styles.contentContainer}>
                <ContentText text="In conclusion, life insurance plays a vital role in securing the financial future of your loved ones. By understanding the importance of life insurance and following these steps to find the right policy, you can ensure that your family is protected financially, even in the face of unexpected events. Take the time to assess your needs, explore the options available, and seek professional advice to make an informed decision. Remember, life insurance provides peace of mind and a lasting legacy for those you care about." />
            </div>
            {!!page.offer2.offer_url ? (
                <RecommendBox
                    mainTitle={page.offer2.main_title}
                    titleText={page.offer2.sub_title}
                    text={page.offer2.sub_text}
                    offerUrl={page.offer2.offer_url}
                    cta={page.offer2.cta}
                    location='bottom'
                />
            ) : (
                <RecommendBox
                    mainTitle="Editor's Choice: Access Today’s Top Life Insurance Offer"
                    titleText="Why we like it"
                    text="This offer caters to individuals looking to protect their families future and offers a variety of options based on your financial needs. The application process is speedy, uncomplicated, and direct."
                    offerUrl={`https://www.bkoffers.com/hitstreet/redirect_tp.cfm?oid=19&sid=9840&pid=3577&eid=bottom-${trackingState.sid}&uid=yourUID`}
                    cta="ACCESS NOW"
                    location='bottom'
                />
            )}
        </div>
    );
};

export default LifeInsuranceArticle;