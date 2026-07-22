import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import CustomTable from './components/CustomTable.jsx';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const BoTArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    function createData(id) {
        return { id };
    };
    function createData2(id, value) {
        return { id, value };
    };
    const columnPros = [
        { id: 'id', label: 'Pros', minWidth: '100%', align: 'left' }
    ];
    const columnCons = [
        { id: 'id', label: 'Cons', minWidth: '100%', align: 'left' }
    ];
    const columnQual = [
        { id: 'id', label: '', minWidth: 50, align: 'left' },
        { id: 'value', label: '', minWidth: '100%', align: 'left' }
    ];

    const rowsPros = [
        createData('Little to No Credit is Required.'),
        createData('Amazing selection of brand name merchandise.'),
        createData('Products are fulfilled by Best Buy™.'),
        createData('Approval amounts are much higher than bad credit, credit cards and short-term loans.'),
        createData('The process was fast and simple.'),
        createData('Fees and rates were far lower than a short-term high interest loan.'),
        createData('Small weekly payments to fit your budget and lifestyle.'),
        createData('Build or rebuild your credit by making on-time payments.'),
    ];
    const rowsCons = [
        createData('There are fees. The longer you lease the item and make minimum payments, the higher the cost of ownership.'),
        createData('They don’t ship. You have to be near a Best Buy™ to take delivery in person.')
    ];

    const rowsQual = [
        createData2('1', 'A 3-month income history'),
        createData2('2', 'Monthly income of greater than $1,000'),
        createData2('3', 'A valid credit card or checking debit card to make a small initial payment'),
        createData2('4', 'A checking account that has been open for 90 days and is in good standing (ie. free from NSFs, excessive overdrafts, & negative balances)')
    ];
    // const { trackingState } = useContext(AppContext);
    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <ArticleTitle text="The Game Changer"/>
                <ContentText text="Recently, I stumbled on a lease-to-own electronics store called BuyOnTrust.com.  I reached out to their customer service to get a better understanding of how the whole process works.  It’s basically like a Rent-A-Center™ online but for brand name electronics fulfilled by Best Buy™.  They literally have just about everything available that Best Buy™ offers.  I was pre-approved for $2,500 after filling out a quick form and I placed an order for a new TV, microwave and dishwasher.  I picked the items up the following day at the Best Buy™ I chose during the checkout process. It really was that simple. I just showed my ID and nothing else was required for pickup." />
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
                <ArticleTitle text="Yes, But Where’s the Catch"/>
                <ContentText text="The lease-to-own model has been around for years.  In the past, you went to a brick and mortar store with an awful selection of products, but they usually provided you with a high enough approval amount you could get life’s bare necessities.   In many cases the products you leased were used.  Interest rates and fees were high, but not as bad as a short-term high interest loan which could cost you 10x your initial approval amount." />
                <ContentText text="At BuyOnTrust.com the fees were reasonable and if I paid off the lease in the first 90 days the fees were negligible.  However, there were fees.  The inventory of brand name electronics was amazing (Literally just about anything you could get at Best Buy™).  In addition, all the products are NEW!" />
            </div>
            <div style={{...styles.contentContainer, display:'flex', justifyContent: 'center', alignContent:' flex-start'}}>
                <CustomTable columns={columnPros} rows={rowsPros}/>
            </div>
            <div style={{...styles.contentContainer, display:'flex', justifyContent: 'center', alignContent:' flex-start'}}>
                <CustomTable columns={columnCons} rows={rowsCons}/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Qualification Criteria"/>
                <ContentText text="The qualification criteria for lease-to-own products at BuyOnTrust.com was surprisingly small.  After being turned down repeatedly in the past, this was refreshing.  Basically, all you need is the following:" />
                <div style={{...styles.contentContainer, display:'flex', justifyContent: 'center', alignContent:' flex-start'}}>
                    <CustomTable columns={columnQual} rows={rowsQual}/>
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Supercharge Your Credit"/>
                <ContentText text="It’s tough to build or rebuild your credit if you can’t get credit to begin with.  Its like trying to climb a ladder that is missing the first eight rungs.  At BuyOnTrust.com, your lease payments get reported to Experian®.  Translation – you could be on the road to good credit in no time!  This alone is a gamechanger." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Higher Approval Amounts to Existing Customers"/>
                <ContentText text="At BuyOnTrust.com, if you make on-time lease payments and pay off your lease, you will be rewarded with higher approval amounts for your next lease!  This is a great added perk for many customers who want to purchase larger items that may be beyond their inital approval amount." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Final Thoughts"/>
                <ContentText text="The unfortunate reality of bad credit has always been high interest rates and fees, low credit amounts and a high credit hurdle to even get approved.  The lease-to-own model still has fairly steep fees but my experience with BuyOnTrust.com was extremely positive and overall, I felt I was treated fairly.  BuyOnTrust.com provided me with exactly what I wanted, and they were extremely open about their fees and the cost of ownership. In a world filled with predatory lending products, my experience at BuyOnTrust.com was a breath of fresh air." />
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

export default BoTArticle;