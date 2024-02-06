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

const AutoWarrantyArticle = () => {
    // const { trackingState } = useContext(AppContext);
    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                As the cost of owning a vehicle continues to rise, the importance of safeguarding your investment becomes increasingly evident. One essential tool in protecting yourself against unexpected repairs and maintenance expenses is an extended auto warranty. While new vehicles typically come with a manufacturer's warranty, an extended warranty provides additional coverage once the initial warranty expires. In this article, we will delve into the significance of extended auto warranties and highlight key factors to consider when choosing the right one for your needs.
                </div>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="The Significance of Extended Auto Warranties"/>                
                <ContentText title="Peace of Mind and Financial Security" text='An extended auto warranty offers a sense of security, knowing that your vehicle is protected against costly repairs even after the original warranty has lapsed. Unexpected breakdowns and repairs can wreak havoc on your budget, causing financial stress. With an extended warranty, you can avoid such stress and maintain peace of mind, knowing that you are covered in case of mechanical failures.' />
                <ContentText title="Cost Savings" text="Vehicles are complex machines with numerous interconnected components. When a major part fails, the repair costs can be exorbitant. An extended auto warranty can significantly reduce or even eliminate out-of-pocket expenses for covered repairs. This can lead to substantial cost savings over the life of your vehicle, making the extended warranty an investment that pays off in the long run." />
                <ContentText title="Enhanced Resale Value" text="When you decide to sell your vehicle, having an extended warranty can be a strong selling point for potential buyers. The assurance that the vehicle is covered for a longer period can instill confidence in buyers and increase the resale value of your car. It's an attractive feature that sets your vehicle apart from others on the market." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="What to Look for in an Extended Auto Warranty"/> 
                <ContentText title="1. Coverage Options" text="Not all extended auto warranties are created equal. It's crucial to examine the coverage options available to ensure they align with your specific needs. Some warranties cover only major components, while others provide more comprehensive coverage, including wear and tear items. Choose a plan that best suits your driving habits and the condition of your vehicle." />
                <ContentText title="2. Duration of Coverage" text="Extended auto warranties come with different term lengths, ranging from one year to several years or a specific mileage limit. Consider how long you plan to keep your vehicle and the average number of miles you drive annually. Opt for a warranty that aligns with your ownership plans to maximize its benefits." />
                <ContentText title="3. Deductibles and Exclusions" text="Pay attention to the deductible amount associated with the warranty. A deductible is the out-of-pocket cost you must pay before the warranty coverage kicks in. A higher deductible may lead to lower upfront costs but could result in higher expenses if you need to use the warranty. Additionally, thoroughly review the exclusions listed in the warranty contract to understand what is not covered." />
                <ContentText title="4. Repair Facility Options" text="Some extended warranties limit repairs to specific authorized service centers, while others allow you to choose from a broader network of repair facilities. Having the flexibility to select a reputable and convenient repair shop can be advantageous, especially if you travel frequently or move to a new location." />
                <ContentText title="5. Transferability and Cancellation Policy" text="Consider the transferability of the warranty to a new owner if you plan to sell your vehicle before the warranty expires. A transferrable warranty can add value to your car when you decide to sell or trade it in. Additionally, be aware of the warranty's cancellation policy to know your options if you sell your vehicle or decide to terminate the coverage." />
                <ContentText title="6. Customer Reviews and Reputation" text="Research the reputation of the warranty provider before making a decision. Look for customer reviews and feedback online to gauge the level of customer satisfaction with the company's service and claims handling process. A reputable and reliable warranty provider should have positive reviews and a good track record." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Wrapping Things Up"/> 
                <ContentText text="An extended auto warranty is a valuable tool in protecting your vehicle and financial well-being against unexpected repairs and maintenance expenses. By providing peace of mind, cost savings, and enhancing the resale value of your vehicle, an extended warranty offers a safety net that every car owner should seriously consider. When choosing the right extended auto warranty, carefully evaluate the coverage options, duration of coverage, deductibles, repair facility options, transferability, and the provider's reputation. Investing in the right extended auto warranty ensures that you can enjoy your vehicle worry-free, regardless of unforeseen mechanical issues that may arise." />
            </div>
        </div>
    );
};

export default AutoWarrantyArticle;