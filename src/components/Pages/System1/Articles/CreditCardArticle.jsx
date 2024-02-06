import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
import ArticleTitle from './components/ArticleTitle.jsx';
// import ButtonContainer from '../ButtonContainer';

const ContentText = ({title, text}) => (
    <div style={styles.contentText}>
        {!!title && <b style={styles.boldText}>{`${title} - `}</b>}{text}
    </div>
);

const CreditCardArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <ArticleTitle text="How to Find the Right Credit Card for You"/>
                <div>
                We use credit cards to extend our spending abilities and better manage our personal finances. There are so many cards available and the card you choose will affect your financial well being. It’s important to do your research and not just apply for the first card you see.
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Card Styles"/>
                <ContentText text="Credit cards come in all shapes and sizes from many different companies. There are different types of credit cards that should be considered based on how you plan to use the card:" />
                <ContentText title="Balance Transfer Credit Card" text="Can be used to pay off balances on other credit cards and consolidate debts into one monthly payment. Introductory rates might be offered for a balance transfer card at 0% for the first year to 18 months, enabling you to pay off the balance during that time and avoid interest rates." />
                <ContentText title="Low Interest Credit Card" text="If you tend to carry over a balance from month to month, a lower interest rate is in your best interest. APRs vary, so don’t base your decision on the lowest APR advertised." />
                <ContentText title="Rewards, Cash Back or Airline Credit Cards" text="Read the fine print and consider what you can earn from using your credit card wisely. Frequent purchases that are paid off in full every month can help you earn back some of the money you spent in the form of cash, rewards or miles." />
                <ContentText title="Secured Credit Card" text="Read the fine print and consider what you can earn from using your credit card wisely. Frequent purchases that are paid off in full every month can help you earn back some of the money you spent in the form of cash, rewards or miles." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Fees and Rates"/>
                <ContentText text="There are countless ways for a credit card company to make money off of you. There may be transaction fees for transferring your balance or getting a cash advance. There can be penalties for paying a bill late, overcharging the card (the card isn’t declined, a stinging fee is just added), making bill payments by phone or requesting a credit limit increase. Because your situation might change, you want to make sure you can accept every aspect of a card – even the features you don’t intend to use, like late fees and carryover balances." />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Credit Cards'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text="Spending Habits and Rewards"/>
                <ContentText text="Though it may not always be the case, knowing how you are going to use the card is key in choosing the right card. You will have to make sure your incentives don’t expire and consider any limits that might be set on a rewards program." />
                <ContentText text="There are cards that provide rewards for all kinds of purchasing habits and cards that provide better rates if your balance does not get paid off in full each month. There are cards that give extra points for shopping at specific places or spending certain amounts. Some cards offer a percentage back, while others might add on additional points per purchase – making all those little purchases add up faster." />
                <ContentText text="We can help you consider all your options. If you are ready to start a new line of credit, click here!" />
            </div>
        </div>
    );
};

export default CreditCardArticle;