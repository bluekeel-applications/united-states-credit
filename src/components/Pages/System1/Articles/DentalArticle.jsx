import React from 'react';
// import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './ArticleTitle';
import SectionTitle from './SectionTitle.jsx';

const ContentText = ({title, text}) => (
    <div style={styles.contentText}>
        {!!title && <b style={styles.boldText}>{`${title} - `}</b>}{text}
    </div>
);

const DentalArticle = () => {
    // const { trackingState } = useContext(AppContext);

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <SectionTitle text='Understanding Dental Implants:'/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='What are Dental Implants?'/>
                <ContentText text='Dental implants are titanium posts that are surgically positioned into the jawbone beneath your gums. Once in place, they allow your dentist to mount replacement teeth onto them.' />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare High Yield Savings'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='Advantages'/>
                <ContentText title='Durability:' text="Implants are very durable and can last many years. With good care, many implants last a lifetime." />
                <ContentText title='Improved Oral Health:' text="Implants don't require reducing other teeth, as a tooth-supported bridge does. Because nearby teeth are not altered to support the implant, more of your own teeth are left intact, improving long-term oral health." />
                <ContentText title='Comfort and Convenience:' text="Implants eliminate the discomfort of removable dentures and the need for messy adhesives to keep them in place." />
            </div>
            <div style={styles.contentContainer}>
                <SectionTitle text='How to Obtain Affordable Dental Implants'/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='1. Dental Insurance'/>
                <ContentText title='Check Your Policy:' text="Some dental insurance plans cover a portion of the cost of dental implants." />
                <ContentText title='Employer-Sponsored Plans:' text="If your employer offers a dental plan, see if implants are covered." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='2. Dental Schools'/>
                <ContentText title='Lower Cost Services:' text="Many dental schools offer dental implant services at a significantly reduced cost. Students perform the procedures, supervised by experienced dentists." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='3. Payment Plans and Financing'/>
                <ContentText title='Dental Offices:' text="Some dental offices offer payment plans that allow you to pay for implants over time." />
                <ContentText title='Healthcare Credit Cards:' text="Specialized credit cards for medical expenses can help manage the cost of implants." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='4. Government Programs'/>
                <ContentText title='Medicare and Medicaid:' text="In some cases, Medicare and Medicaid may cover the cost of dental implants." />
                <ContentText title="Veterans' Benefits:" text="If you're a veteran, check if you're eligible for dental care through the VA." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='5. Comparison Shopping'/>
                <ContentText title='Get Multiple Quotes:' text="Prices for dental implants can vary significantly from one provider to another. Get quotes from several dentists." />
                <ContentText title="Overseas Options:" text="Some people choose to get dental implants in countries where dental care is less expensive." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='6. Discount Dental Plans'/>
                <ContentText title='Membership Plans:' text="Some companies offer plans where you pay an annual fee in exchange for lower rates on dental work, including implants." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='7. Charitable Organizations'/>
                <ContentText title='Free or Low-Cost Services:' text="Some organizations offer free or low-cost dental treatments for those in need." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='8. Clinical Trials'/>
                <ContentText title='Participate in Research:' text="Occasionally, dental researchers conduct studies that require volunteers to undergo dental procedures, including implants." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Conclusion'/>
                <ContentText text="While dental implants can be expensive, there are ways to make them more affordable. Research, careful planning, and exploring all your options can help reduce the financial burden. Always consult with a dental professional to understand the best options for your situation. Remember, investing in dental implants is not only an investment in your smile but also in your overall health and well-being." />
            </div>
        </div>
    );
};

export default DentalArticle;