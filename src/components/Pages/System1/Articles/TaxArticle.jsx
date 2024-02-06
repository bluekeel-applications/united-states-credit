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

const TaxArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                Tax issues can be daunting, especially when you find yourself in a situation where you owe a significant amount or are facing an audit. In such cases, tax resolution companies can provide invaluable assistance. These specialized firms are equipped with the knowledge and expertise to help individuals and businesses navigate through complex tax matters and find viable solutions. In this article, we will delve into the world of tax resolution companies, exploring their role, services, and how they can potentially alleviate your tax-related burdens.
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Understanding Tax Resolution Companies:"/>
                <ContentText text='Tax resolution companies are professional firms that specialize in resolving tax problems on behalf of their clients. They employ tax professionals, including enrolled agents, certified public accountants (CPAs), and tax attorneys, who possess in-depth knowledge of tax laws and regulations. These professionals work closely with clients to identify and address their specific tax concerns.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Services Offered by Tax Resolution Companies:'/>
                <ContentText title='1. Tax Negotiation and Settlement' text='Tax resolution companies can negotiate with the Internal Revenue Service (IRS) or state tax authorities on your behalf. They explore options such as offers in compromise, installment agreements, or penalty abatement to help reduce the overall tax liability or establish manageable payment plans.' />
                <ContentText title='2. Audit Representation' text='If you face an IRS audit, tax resolution companies can provide representation and guide you through the audit process. They ensure that your rights are protected, help gather necessary documentation, and present your case effectively.' />
                <ContentText title='3. Tax Debt Resolution' text='If you have accumulated tax debt, tax resolution companies can develop strategies to address it. They analyze your financial situation, assess eligibility for debt reduction programs, and negotiate with tax authorities to find a feasible resolution.' />
                <ContentText title='4. Penalty and Interest Abatement' text='In certain cases, tax resolution professionals can help reduce or eliminate penalties and interest associated with tax debts. They review your circumstances and work towards reaching a favorable outcome.' />
                <ContentText title='5. Offer in Compromise (OIC) Assistance' text='Tax resolution companies can guide you through the process of an offer in compromise. This option allows qualifying taxpayers to settle their tax debt for less than the full amount owed. Skilled professionals help determine eligibility, gather required documentation, and present a compelling case to the IRS.' />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Tax Resolution'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='Benefits of Engaging a Tax Resolution Company:'/>
                <ContentText title='1. Expertise and Experience' text="Tax resolution companies have a deep understanding of tax laws, regulations, and negotiation techniques. Their professionals are well-versed in handling complex tax matters, ensuring that you receive the most accurate advice and effective representation." />
                <ContentText title='2. Time and Stress Savings' text="Dealing with tax issues can be time-consuming and stressful. Engaging a tax resolution company allows you to offload the burden to experienced professionals who can handle the complexities on your behalf. This frees up your time to focus on other important aspects of your life or business." />
                <ContentText title='3. Improved Communication' text="Tax resolution professionals act as intermediaries between you and tax authorities. They communicate with tax agencies on your behalf, ensuring that your rights are protected and minimizing the chances of miscommunication or misunderstandings." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Choosing the Right Tax Resolution Company:'/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='When selecting a tax resolution company, consider the following factors:'/>
                <ContentText title='Reputation and Credentials' text="Research the company's reputation, including client reviews and professional accreditations." />
                <ContentText title='Transparent Pricing' text="Ensure that the company provides clear and transparent pricing information upfront." />
                <ContentText title='Personalized Approach' text="Look for a company that offers tailored solutions based on your specific tax situation." />
            </div>
            <div style={styles.contentContainer}>
                <ContentText text="Tax resolution companies play a vital role in helping individuals and businesses navigate through complex tax challenges. Their expertise, experience, and understanding of tax laws can alleviate the burden of dealing with tax problems and provide you with peace of mind. If you find yourself in a tax predicament, consider consulting a reputable tax resolution company to explore viable solutions and work towards resolving your tax issues efficiently and effectively." />
            </div>
        </div>
    );
};

export default TaxArticle;