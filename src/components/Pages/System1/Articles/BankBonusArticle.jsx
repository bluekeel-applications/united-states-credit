import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText.jsx';
import RecommendBox from './components/RecommendBox.jsx';

const BankBonusArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return(
        <div style={styles.mainConatiner}>
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
                <ArticleTitle text="Banks Offering Bonuses for New Accounts: A Win-Win for Consumers and Financial Institutions"/>
                <ContentText text="In the competitive world of banking, institutions are constantly seeking innovative ways to attract new customers. One popular strategy that has gained significant traction in recent years is the offering of bonuses for opening a new account. These promotions, often involving cash rewards or other incentives, have become a standard feature in the marketing arsenal of many banks. But why are banks so eager to give out these bonuses, and what do consumers stand to gain from them?" />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="The Strategy Behind the Bonuses"/>
                <ContentText text="Banks are businesses like any other, with a need to grow their customer base and increase their market share. By offering bonuses for new accounts, they create an immediate incentive for potential customers to choose their services over competitors. This strategy is particularly effective in a market saturated with similar products and services, where differentiation is key to gaining an edge." />
                <ContentText text="The bonuses typically come in the form of cash rewards, ranging from $100 to $500, depending on the type of account and the initial deposit or direct deposit requirements. Some banks might also offer rewards in the form of gift cards, travel points, or other perks. These offers are often time-sensitive, creating a sense of urgency that encourages consumers to act quickly." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Benefits for Consumers"/>
                <ContentText text='For consumers, these bonuses can represent a significant financial benefit, especially for those who are already considering opening a new account or switching banks. The allure of "free money" is hard to resist, and for good reason. For example, a cash bonus can effectively serve as an interest-free loan, a boost to savings, or a cushion for unexpected expenses.' />
                <ContentText text="Additionally, the process of qualifying for these bonuses is typically straightforward. Requirements usually include maintaining a minimum balance for a certain period, setting up direct deposit, or making a specific number of transactions. For many people, these are actions they would undertake anyway, making the bonus a no-brainer." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="A Win-Win Scenario"/> 
                <ContentText text="While consumers certainly benefit from these offers, banks also see a return on their investment. The cost of the bonus is often outweighed by the long-term value of a new customer. Once a new account is opened" />
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

export default BankBonusArticle;