import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText.jsx';
import RecommendBox from './components/RecommendBox.jsx';

const CellPhoneArticle = () => {
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
                <ContentText text="The latest Google Pixel smartphones continue to impress with their cutting-edge camera features, seamless integration with Google services, and consistent software updates. These devices stand out as top choices for users looking for enhanced productivity, security, and an all-around premium smartphone experience." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Why Choose a New Google Pixel Smartphone?"/> 
                <ContentText text="When it comes to selecting a new smartphone, Google Pixel devices offer distinct features that set them apart from the competition. Known for their exceptional camera technology, the Pixel series consistently earns high marks from both experts and users alike. The latest models come equipped with advanced computational photography capabilities that allow you to capture stunning photos, even in challenging lighting conditions. From low-light environments to distant subjects, the Pixel’s ability to deliver professional-quality photos is widely recognized across the tech industry." />
                <ContentText text="In addition to its camera prowess, Google Pixel smartphones offer deep integration with the company’s suite of services, including Google Assistant, Google Photos, and Google Drive. This streamlined ecosystem enhances productivity and creates a cohesive user experience, making multitasking and organization simpler and more efficient. Studies show that users appreciate how easy it is to manage their digital lives with a Pixel device, further boosting satisfaction." />
                <ContentText text="Another key advantage is the commitment Google makes to providing regular software updates. These updates not only keep your device secure but also ensure you always have access to the latest features and improvements. Staying current with software updates is crucial for maintaining device performance and security, and Google’s timely rollout of updates makes Pixel smartphones a reliable choice for those who want a future-proof device." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Key Benefits of Owning a Google Pixel Smartphone:"/> 
                <ContentText text="Choosing a Google Pixel smartphone offers a range of benefits tailored to different user needs. The standout feature for many is the exceptional camera. With advanced technologies like Night Sight and Super Res Zoom, Pixel devices make it easy to capture sharp, detailed photos even in low-light conditions or when photographing distant objects. Whether you’re a photography enthusiast or simply want to capture great photos without extra gear, the Pixel camera consistently delivers impressive results." />
                <ContentText text="Another significant advantage is the seamless integration with Google’s suite of services. With built-in Google Assistant, users can easily complete tasks using voice commands, from setting reminders and sending messages to managing smart home devices. This integration not only helps streamline daily activities but also ensures a more connected, efficient lifestyle." />
                <ContentText text="In addition, Pixel devices are designed with privacy and security in mind. Features like the Titan M security chip and regular security updates protect your data from potential threats. For users who prioritize digital safety, Google’s focus on security makes the Pixel smartphone a trustworthy choice." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Enjoy Advanced Photography, Seamless Integration, and Reliable Updates."/> 
                <ContentText text="Google Pixel smartphones are known for offering a combination of stunning photography, easy integration with Google services, and the assurance of regular updates. The advanced camera system allows anyone to take beautiful, professional-quality photos with features like HDR+ and Portrait Mode. Whether you’re taking photos in bright daylight or capturing memories in dimly lit environments, the Pixel camera adapts to your needs." />
                <ContentText text="The integration with Google services further enhances the user experience. With apps like Google Maps, Google Calendar, and Google Drive, everything you need to stay organized and connected is available in one place. Whether for personal or professional use, this seamless ecosystem helps you stay on top of tasks and manage your digital life with ease." />
                <ContentText text="Regular software updates are another hallmark of the Google Pixel. These updates ensure that your phone stays up to date with the latest features, performance improvements, and security enhancements. This ongoing support is an important reason why many users value Pixel smartphones—they provide a device that evolves alongside your needs." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Learn More About Google Pixel Smartphones:"/> 
                <ContentText text="For anyone interested in exploring Google Pixel smartphones further, there are plenty of resources available to provide detailed information about the latest models, features, and user experiences. Trusted tech review sites, official Google resources, and user forums can offer valuable insights to help you make an informed decision about whether a Google Pixel smartphone is the right choice for you." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Sources:"/>
                <ContentText title='Wired' text={`"Which Google Pixel Phone Should You Buy?"`} />
                <ContentText title='Google' text={`"Google Pixel Features You Didn’t Know You Had"`} />
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

export default CellPhoneArticle;