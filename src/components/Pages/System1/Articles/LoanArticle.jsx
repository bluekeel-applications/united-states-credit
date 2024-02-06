import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
import { useMediaQuery } from 'react-responsive';
import ArticleTitle from './components/ArticleTitle.jsx';
// import ButtonContainer from '../ButtonContainer.jsx';

const ContentTitle = ({text}) => (
    <div style={styles.contentHeading}>
        {text}
    </div>
);
const ContentText = ({text}) => (
    <div style={styles.contentText}>
        {text}
    </div>
);
const ExampleTable = () => (
    <table style={styles.exampleTable}>
        <tbody>
            <tr>
                <td style={styles.tableData}>Loan Amount</td>
                <td style={styles.tableData}>$3,000</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Lending Period</td>
                <td style={styles.tableData}>48 months</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Payment Frequency</td>
                <td style={styles.tableData}>Monthly</td>
            </tr>
            <tr>
                <td style={styles.tableData}>APR</td>
                <td style={styles.tableData}>27.00%</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Pmt</td>
                <td style={styles.tableData}>$163.14</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Total Cost</td>
                <td style={styles.tableData}>3,915.38</td>
            </tr>
            <tr>
                <td style={styles.tableData}>Origination Fee</td>
                <td style={styles.tableData}>Varies between lenders</td>
            </tr>
        </tbody>
    </table>
);

const TableHeader = ({text}) => (
    <th style={styles.tableHeader}>{text}</th>
);
const CostsTable = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const mainStyle = Object.assign(
        styles.exampleTable,
        isMobile && styles.exampleTableMobile
    );

    const TableRow = ({dataArray, color}) => {
        return(
            dataArray.map((idx, data) => (
                <td key={`${idx}-row`} style={color === '1' ? styles.tableData : styles.tableData2}>{data}</td>
            ))
        )
    };

    const row1 = [
        '$1,000',
        '24.00%',
        '12 months',
        '3.00%',
        '$30.00',
        '$94.56',
        '29.82%',
        '$1,134.72',
        '$164.72'
    ];
    const row2 = [
        '$2,000',
        '19.00%',
        '24 months',
        '5.00%',
        '$100.00',
        '$100.82',
        '24.12%',
        '$2,419.68',
        '$519.68'
    ];
    const row3 = [
        '$5,000',
        '13.00%',
        '48 months',
        '8.00%',
        '$400.00',
        '$131.67',
        '18.23%',
        '$6,320.12',
        '$1,720.12'
    ];
    const row4 = [
        '$10,000',
        '7.90%',
        '60 months',
        '10.00%',
        '$1,000.00',
        '$202.28',
        '9.20%',
        '$12,136.80',
        '$3,136.80'
    ];

    return (
        <table style={mainStyle}>
            <tbody style={{width: '100%'}}>
                <tr>
                    <TableHeader text="Loan Amount"/>
                    <TableHeader text="Interest Rate"/>
                    <TableHeader text="Loan Term"/>
                    <TableHeader text="Fee"/>
                    <TableHeader text="Fee Cost"/>
                    <TableHeader text="Repayment"/>
                    <TableHeader text="APR"/>
                    <TableHeader text="Total Repayments"/>
                    <TableHeader text="Total Cost"/>
                </tr>
                <tr>
                    <TableRow dataArray={row1} color='1'/>
                </tr>
                <tr>
                    <TableRow dataArray={row2} color='2'/>
                </tr>
                <tr>
                    <TableRow dataArray={row3} color='1'/>
                </tr>
                <tr>
                    <TableRow dataArray={row4} color='2'/>
                </tr>
            </tbody>
        </table>
    );
}

const LoanArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <ArticleTitle text="How To: Apply for a Loan Online"/>
                <div>
                There are many reasons why you need to get a personal loan. You may need money in an emergency to pay for medical bills or repair damages to property and possessions. You could be looking to refinance your credit cards, make home improvements or even pay for a wedding or vacation. No matter the reason, a personal loan can provide you with the money you need as you can make convenient payments that are more aligned to your personal financial situation.
                </div>
                <ContentText text="Luckily, the Internet has expanded our options on where we can find loan options. You no longer have to just go to your local bank for a traditional loan. You can now look for loans online from a wide range of lenders as you can compare rates, terms and conditions that are more agreeable to you. Here are some tips on how to apply for a personal loan online."/>
            </div>
            <div style={styles.contentContainer}>
                <ContentTitle text="1. Understand Your Funding Needs" />
                <ContentText text="A problem that a lot of people experience when getting a loan is figuring out the amount to ask from the lender. Ask for too little and you end up having to take out a second loan. Take out too much and you are paying back the extra money with interest. Sit down and decide on how much you need and whether getting a personal loan is the best option. There are times when other lending methods, such as friends or relatives, are better for your financial situation." />
            </div>
            <div style={styles.contentContainer}>
                <ContentTitle text="2. Check Out Your Credit Score" />
                <ContentText text="You credit score will determine the amount you may be qualified to borrow and your interest rates. You should have the highest score possible for the best rates and term conditions. Yet even if you have a low score to where lenders won’t pre-qualify you for a loan, you still may be able to get one by having a co-signer who has a better credit score. You may also qualify for a secure loan where you put up something as collateral, such as a savings account, a car or other assets. Many people take the secure loan route also when looking for better interest rates." />
            </div>
            <div style={styles.contentContainer}>
                <ContentTitle text="3. Research Before Getting Pre-Approval" />
                <ContentText text="At this point, you may be thinking about going to as many loan websites as you can to get pre-approval. Yet before you do this, read the fine print regarding credit checks. Some companies will perform soft credit checks at the pre-approval stage that won’t impact your credit score. Others will perform hard credit checks that will take off a few points. So read about the lender, its fee structure and other details first so you don’t harm your credit while getting the best deals. Then select the lenders that are a better fit for your needs." />
                <ContentText text="You’ll also want to avoid shady lenders. Some warning signs of a shady lender may include:" />
                <ul>
                    <li style={styles.contentText}>No credit check: Lenders who don’t perform any credit checks before offering you a loan will hedge their risks by charging exorbitant interest rates, some as high as 200%.</li>
                    <li style={styles.contentText}>Added hidden fees or product add-ons: If a lender requires you to purchase insurance or include a fee to get a loan as this cost isn’t included into the annual percentage rate (APR), walk away. No reputable lender will add on any type of fee that isn’t clearly stated as a cost in the APR.</li>
                    <li style={styles.contentText}>No website security certificate: Since you are getting an online loan, you want to make sure your transmitted electronic information is secure. A legitimate lender will always have an up-to-date security certificate and a URL with a “https.” You should also see a green lock symbol next to the URL.</li>
                </ul> 
            </div>
            <div style={styles.contentContainer}>
                <ContentTitle text="4. Applying for a Personal Loan" />
                <ContentText text="You will need to fill out the required application and provide the online lender with certain personal information regarding your finances. While each lender’s requirements can differ, the main documents you will need to send them include proof of income, personal identification, and address verification. Copies of a driver’s license or passport, your W2 forms or wage stubs, and utility bills are common documents people send in to lenders." />
                <ContentText text="After submitting your documents, you will hear back from the online lender regarding final approval and when the money will be transferred to your bank account. This approval can take anywhere from a few days to over a week based on the loan amount you are asking for and any other additional documents they may ask for to make a decision. Once you are approved, you will have the personal loan that you need." />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Personal Loans'/> */}
            <div style={styles.contentContainer}>
                <ContentTitle text="Examples of Costs & APR"/>
                <CostsTable />
            </div>
            <div style={styles.contentContainer}>
                <ContentTitle text="Representative Example (Qualified Customers)" />
                <ContentText text="Terms of your loan will vary based on the amount of the loan and the period of time to repay. Other factors may include the state you live in, your source of income, and your repayment history. Please contact your lender directly for questions regarding your loan." />
                <ExampleTable />
                <ContentText text="APR for good credit typically ranges from 5.99% to 35.99% and generally will have a repayment term of 2 months to 72 months. Loan amounts under $1,000 will have varying APR’s than what is listed in the represented example above. Please contact your lender for more information." />
            </div>
        </div>
    );
};

export default LoanArticle;