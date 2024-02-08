import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText.jsx';

const AutoFinanceArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Understanding Auto Loans"/>
                <div>
                An auto loan is essentially a sum of money borrowed to purchase a vehicle. The borrower agrees to repay the loan amount, along with interest, over a set period, typically ranging from 24 to 72 months. Lenders may be banks, credit unions, or auto finance companies. Some car manufacturers also offer financing options through their finance arms.
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Secured vs Unsecured Loans"/> 
                <ContentText text="Most auto loans are secured loans, meaning the vehicle itself acts as collateral. If you default on the loan, the lender has the right to repossess the car. Unsecured auto loans are rare and typically have higher interest rates, as the lender takes on more risk." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Key Factors to Consider"/>
                <ContentText title='Interest Rate' text='The interest rate, often presented as an Annual Percentage Rate (APR), can significantly affect the total cost of the car over the loan period. Rates may vary depending on several factors like credit score, loan term, and the lender.' />
                <ContentText title='Loan Term' text='Longer loan terms mean smaller monthly payments but can result in you paying more in interest over time. Conversely, shorter terms have higher monthly payments but typically come with lower interest rates.' />
                <ContentText title='Down Payment' text='A down payment is the upfront money you pay to reduce the loan amount. Larger down payments can reduce your monthly installments and possibly qualify you for lower interest rates.' />
                <ContentText title='Fees and Penalties' text='Always read the fine print to understand any additional charges, like loan origination fees or penalties for early repayment.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Pre-qualification vs Pre-approval"/>
                <ContentText title='Pre-qualification' text="A basic review of your financial standing to give you an idea of the loan amount and interest rate you could qualify for. This typically doesn't require a hard credit check." />
                <ContentText title='Pre-approval' text='A more in-depth process involving a detailed review of your finances and a hard credit check. Being pre-approved gives you a definite loan amount and interest rate, simplifying your car-buying experience.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Shopping Around"/> 
                <ContentText text="Once you have a clear understanding of your financial standing and needs, it’s wise to shop around. Consult multiple lenders to get the best rates and terms. Use online tools and calculators to understand the financial implications of different loan options." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Finalizing the Deal"/> 
                <ContentText text="After you have selected a lender and a loan package, you will need to submit various financial documents like income statements, credit history, and proof of insurance. Once the loan is approved, you’ll sign the contract, receive the funds, and purchase your vehicle." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Repayment"/> 
                <ContentText text="You'll begin repaying the loan according to the agreed-upon schedule. Failure to meet these obligations could result in the repossession of your vehicle and a negative impact on your credit score." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Refinancing"/> 
                <ContentText text="If your financial situation improves or interest rates drop, you may consider refinancing the loan for a better rate. This essentially means taking out a new loan to pay off the existing one, hopefully with more favorable terms." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Things to Avoid"/>
                <ContentText title='1. Long Loan Terms' text="Loans that stretch over 60 months often have lower monthly payments but can trap you in a cycle of negative equity." />
                <ContentText title='2. Rolling Over Loans' text="Some people trade in their cars before the loan term is complete and roll the remaining loan amount into a new loan. This can lead to a cycle of increasing debt." />
                <ContentText title='3. Skipping the Fine Print' text="Always read the contract carefully to understand all terms and conditions." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Bringing It All Together"/> 
                <ContentText text="Auto finance loans offer a convenient way to own a vehicle, but they come with responsibilities. Understanding key elements like interest rates, loan terms, and down payments can significantly impact your financial health. Shop around for the best deals, read the fine print, and keep an eye out for potential pitfalls. Making informed decisions will not only get you behind the wheel but also keep you on the road to financial stability." />
            </div>
        </div>
    );
};

export default AutoFinanceArticle;