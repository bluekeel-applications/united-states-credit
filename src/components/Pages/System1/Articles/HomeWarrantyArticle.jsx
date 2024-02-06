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

const HomeWarrantyArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                When it comes to safeguarding your home and protecting your investment, a home warranty can be an invaluable tool. A home warranty provides coverage for the repair or replacement of major home systems and appliances, offering peace of mind and potential savings on unexpected expenses. In this article, we'll explore the importance of a home warranty and provide guidance on how to shop for and find the best one for your needs.
                </div>
            </div>
            
            <div style={styles.contentContainer}>
                <ArticleTitle text='Understanding the Importance of a Home Warranty:'/>
                <ContentText title='1. Financial Protection' text='Homeownership often comes with unforeseen repair costs. A home warranty helps mitigate these expenses by covering the repair or replacement of covered items, such as heating and cooling systems, electrical systems, plumbing, kitchen appliances, and more.' />
                <ContentText title='2. Budgetary Peace of Mind' text='With a home warranty, you can anticipate your maintenance costs and avoid sudden financial burdens. Instead of worrying about a significant repair bill, you can focus on enjoying your home knowing that you have coverage in place.' />
                <ContentText title='3. Convenience and Ease' text='Dealing with unexpected breakdowns can be stressful and time-consuming. A home warranty simplifies the process by connecting you with pre-screened service providers who can efficiently address your repair needs.' />
                <ContentText title='4. Added Value for Buyers and Sellers' text="When selling a home, offering a home warranty can attract potential buyers, assuring them that they won't face immediate repair expenses. For buyers, having a home warranty in place after purchasing a property can provide a safety net and protect against unforeseen issues." />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Tax Resolution'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='Tips for Shopping and Finding the Best Home Warranty:'/>
                <ContentText title='1. Evaluate Coverage Options' text="Start by understanding what coverage is most important to you. Assess the age and condition of your home's systems and appliances, and consider the coverage terms, exclusions, and limits offered by different home warranty providers. Look for plans that align with your specific needs." />
                <ContentText title='2. Research Reputable Providers' text="Look for well-established home warranty companies with a positive track record. Read customer reviews, check their reputation with consumer protection agencies, and seek recommendations from friends, family, or real estate professionals." />
                <ContentText title='3. Compare Plans and Pricing' text="Request quotes from multiple providers and carefully compare the coverage plans, costs, deductibles, and service fees. Make sure you understand what is covered, what is excluded, and any limitations or waiting periods before the coverage begins." />
                <ContentText title='4. Understand Claim Procedures' text="Familiarize yourself with the home warranty company's claim process. Check if they have a 24/7 customer service line and assess the ease of filing claims. Prompt and hassle-free claims handling can make a significant difference during emergencies." />
                <ContentText title='5. Read the Fine Print' text="Before committing to a home warranty, carefully read the contract to understand the terms, conditions, and exclusions. Pay attention to coverage limits, pre-existing conditions, and any maintenance requirements that may affect your eligibility for coverage." />
                <ContentText title='6. Seek Clarification' text="If there are any ambiguities or questions regarding coverage, don't hesitate to reach out to the home warranty provider directly. A reliable company will be transparent and readily address your concerns." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Wrapping it all up:'/>
                <ContentText text="Investing in a home warranty is a wise decision for homeowners seeking financial protection, convenience, and peace of mind. By understanding the importance of a home warranty and following the tips outlined above, you can confidently navigate the market to find the best home warranty that suits your specific needs. Remember, thorough research, careful evaluation of coverage, and reputable providers are key to securing a reliable home warranty that will help protect your home for years to come." />
            </div>
        </div>
    );
};

export default HomeWarrantyArticle;