import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText';

const DebtArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                Debt consolidation can be a valuable strategy for individuals grappling with overwhelming debt. In this article, we will explore what debt consolidation entails and shed light on how a debt consolidation company can assist you in effectively eliminating your debt burdens.
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Understanding Debt Consolidation:'/>
                <ContentText text='Debt consolidation involves merging multiple debts into a single loan or repayment plan. It is designed to simplify your financial obligations by combining various debts, such as credit card balances, personal loans, or medical bills, into one manageable payment. Rather than dealing with multiple creditors and due dates, debt consolidation allows you to focus on a single monthly payment.' />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare High Yield Savings'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='The Role of a Debt Consolidation Company:'/>
                <ContentText text="A debt consolidation company specializes in assisting individuals in managing their debts. They provide professional guidance, negotiation services, and financial solutions tailored to your unique circumstances. Here's how a debt consolidation company can help you:" />
                <ContentText title='1. Expert Assessment' text="A reputable debt consolidation company will conduct a comprehensive assessment of your financial situation. They will analyze your outstanding debts, interest rates, income, and expenses to gain a holistic understanding of your financial standing. This evaluation helps them develop a customized debt consolidation plan that aligns with your goals and abilities." />
                <ContentText title='2. Negotiation with Creditors' text="Debt consolidation companies have established relationships with creditors. They leverage these connections to negotiate with your creditors on your behalf. Their objective is to secure reduced interest rates, waive late fees, or negotiate lower outstanding balances. By advocating for better terms, they aim to make your debt more manageable and affordable." />
                <ContentText title='3. Consolidation Loans' text="A debt consolidation company can help you secure a consolidation loan. They work with lending institutions or have in-house financing options. These loans are used to pay off your existing debts, leaving you with a single loan and one fixed monthly payment. Consolidation loans often come with lower interest rates and longer repayment terms, making your debt more manageable." />
                <ContentText title='4. Debt Management Plans' text="In some cases, a debt consolidation company may recommend enrolling in a debt management plan (DMP). With a DMP, you make a single monthly payment to the consolidation company, who then distributes the funds to your creditors on your behalf. The debt consolidation company negotiates with creditors to reduce interest rates, eliminate penalties, and create an affordable repayment plan." />
                <ContentText title='5. Financial Education and Support' text="Alongside debt consolidation services, reputable companies offer financial education and ongoing support. They provide you with valuable resources, budgeting tools, and debt management strategies to help you regain control of your finances. They can also offer guidance on improving your credit score and adopting healthy financial habits." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Benefits of Working with a Debt Consolidation Company:'/>
                <ContentText title='1. Simplified Debt Management' text="A debt consolidation company streamlines your debt repayment process by consolidating multiple debts into a single payment. This simplification helps you stay organized and reduces the chances of missing payments or incurring late fees." />
                <ContentText title='2. Lower Interest Rates and Fees' text="Debt consolidation companies have the expertise to negotiate with creditors for more favorable interest rates and potentially reduce or eliminate certain fees. This can result in significant savings over time and accelerate your debt elimination progress." />
                <ContentText title='3. Tailored Solutions' text="Debt consolidation companies understand that every individual's financial situation is unique. They develop personalized plans that address your specific needs, considering factors such as income, expenses, and outstanding debts. This customized approach increases the chances of successfully eliminating your debt." />
                <ContentText title='4. Financial Guidance and Support' text="Debt consolidation companies provide professional guidance and ongoing support throughout your debt repayment journey. They equip you with the knowledge and tools necessary to make informed financial decisions, helping you rebuild your financial stability." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Wrapping Things Up'/>
                <ContentText text="Debt consolidation companies play a vital role in helping individuals eliminate their debt burdens. By leveraging their expertise, negotiation skills, and financial solutions, these companies simplify your debt management, reduce interest rates, and provide tailored strategies for a successful debt repayment journey. If you find yourself overwhelmed by multiple debts, seeking assistance from a reputable debt consolidation company can be a proactive step towards regaining control of your financial future." />
            </div>
        </div>
    );
};

export default DebtArticle;