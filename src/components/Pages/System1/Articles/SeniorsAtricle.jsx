import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const SeniorsArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                As we age, the activities of daily living that once came easily may begin to pose challenges. Whether it's managing medication, grocery shopping, or even personal care, these tasks can become burdensome for seniors. This is where assisted living communities come into play. Offering a comprehensive approach to senior care, these facilities are designed to provide a safe, secure, and dignified environment for the elderly. In this article, we'll delve into the importance of assisted living care for seniors, the different options available, and key factors to consider when researching the ideal setting for your loved one.
                </div>
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
                <ArticleTitle text="The Importance of Assisted Living Care"/>
                <ContentText title='Dignity and Independence' text='Assisted living centers offer residents the opportunity to live independently, while also having access to assistance when needed. Residents can engage in activities, socialize, and maintain a certain level of privacy, which is crucial for their self-esteem and mental well-being.' />
                <ContentText title='Specialized Healthcare Support' text='Many seniors suffer from chronic conditions or need routine medical care. Assisted living communities often provide on-site healthcare services, making it easier for residents to manage their health without the hassle of frequent hospital visits.' />
                <ContentText title='Safety and Security' text='One of the primary concerns for seniors living alone is safety. Assisted living centers are equipped with security measures like 24/7 surveillance, emergency call systems, and trained staff to handle various types of crises.' />
                <ContentText title='Social Engagement' text='Isolation can lead to depression and cognitive decline among seniors. Assisted living communities provide a myriad of social activities designed to keep residents mentally and emotionally engaged.' />
                <ContentText title='Nutritional Support' text='As seniors age, nutritional needs change and it becomes challenging to prepare balanced meals. Assisted living centers usually offer meal services that are not just convenient but also nutritionally balanced, often customized to individual dietary needs.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Assisted Living Options"/>
                <ContentText title='Traditional Assisted Living' text='These are residential settings that offer a variety of services including meal preparation, medication management, and basic healthcare.' />
                <ContentText title='Memory Care Units' text='Designed specifically for seniors suffering from dementia or Alzheimer’s disease, these units offer specialized care to manage the unique challenges associated with these conditions.' />
                <ContentText title='Continuing Care Retirement Communities (CCRC)' text='These offer a full spectrum of care from independent living to skilled nursing care, allowing residents to age in one community even as their needs change.' />
                <ContentText title='Respite Care' text='For families who take care of their elderly at home, respite care services offer short-term stays in assisted living facilities, providing caregivers a much-needed break.' />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare High Yield Savings'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text="What to Look For"/>
                <ContentText title='Accreditation and Licenses' text='Make sure the facility you are considering is accredited by reputable agencies and meets state licensing requirements.' />
                <ContentText title='Staff-to-Resident Ratio' text='Check the ratio of healthcare professionals to residents to ensure your loved one receives adequate attention and care.' />
                <ContentText title='Amenities and Services' text='Look for facilities that offer a variety of services and amenities like fitness centers, art classes, and outdoor activities that match your loved one’s interests.' />
                <ContentText title='Reviews and Testimonials' text='Take time to read reviews and speak with current residents and their families to gauge the quality of care.' />
                <ContentText title='Cost and Payment Options' text='Assisted living can be expensive. Ensure that you fully understand the costs involved and what payment options, such as Medicare or Medicaid, are available to offset them.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Bringing It All Together"/> 
                <ContentText text="Choosing the right assisted living option is crucial for a senior’s well-being. By understanding the importance of such facilities, identifying the type that suits your loved one, and conducting thorough research, you can make an informed decision that ensures your elderly family member lives a life of dignity, safety, and happiness in their twilight years." />
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

export default SeniorsArticle;