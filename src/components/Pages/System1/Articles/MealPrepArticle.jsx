import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import SectionTitle from './components/SectionTitle.jsx';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const MealPrepArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <SectionTitle text='Understanding Meal Prep Services:'/>
                <ContentText text="Meal prep services prepare and deliver ready-to-eat meals to your door. They vary in terms of menu options, customization, pricing, and focus on specific dietary needs or health goals." />
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
                <SectionTitle text='Key Factors to Consider'/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='1. Determine Your Health Goals'/>
                <ContentText title='Weight Loss:' text="Look for services offering calorie-controlled meals." />
                <ContentText title='Muscle Gain:' text="Seek out high-protein options." />
                <ContentText title='Dietary Restrictions:' text="Consider services that cater to specific dietary needs like gluten-free, vegan, or keto." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='2. Nutritional Balance'/>
                <ContentText title='Balanced Meals:' text="Ensure meals contain a balanced mix of macronutrients (protein, carbs, fats) and micronutrients (vitamins, minerals)." />
                <ContentText title='Portion Control:' text="Portion size is crucial for weight management." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='3. Ingredient Quality'/>
                <ContentText title='Whole Foods:' text="Prioritize services using fresh, whole ingredients over processed foods." />
                <ContentText title='Organic and Local:' text="If important to you, look for services using organic or locally sourced ingredients." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='4. Customization Options'/>
                <ContentText title='Dietary Preferences:' text="Check if the service allows customization to accommodate your taste preferences and dietary restrictions." />
                <ContentText title="Flexibility:" text="Look for services that offer the flexibility to change meals, pause, or cancel subscriptions." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='5. Price and Budget'/>
                <ContentText title='Cost-Effectiveness:' text="Compare prices of different services. Consider the cost per meal and delivery fees." />
                <ContentText title='Budget Alignment:' text="Choose a service that aligns with your budget without compromising on quality." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='6. Convenience'/>
                <ContentText title='Preparation Time:' text="Some services offer fully cooked meals, while others deliver meal kits that require some cooking." />
                <ContentText title='Delivery Schedule:' text="Check if the service can accommodate your schedule and lifestyle." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='7. Reviews and Testimonials'/>
                <ContentText title='Customer Feedback:' text="Look for reviews and testimonials to gauge customer satisfaction." />
                <ContentText title='Independent Reviews:' text="Check independent review sites and forums for unbiased opinions." />
            </div>
            <div style={styles.contentContainer}>
                <SectionTitle text='Steps to Find the Best Meal Prep Service'/>
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='1. Research and List Potential Services'/>
                <ContentText text="Look online for meal prep services that align with your health goals." />
                <ContentText text="Ask for recommendations from friends, family, or nutritionists." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='2. Compare Services'/>
                <ContentText text="Evaluate based on the key factors mentioned above." />
                <ContentText text="Utilize free trials or sample meals if available." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='3. Assess Meal Variety and Taste'/>
                <ContentText text="Ensure the service offers a variety of meals to prevent boredom." />
                <ContentText text="Taste is important for long-term adherence, so consider the appeal of the menu." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='4. Check for Accreditation or Endorsements'/>
                <ContentText text="Some services may have endorsements from health professionals or certifications." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='5. Monitor Your Progress'/>
                <ContentText text="Once you choose a service, monitor your progress towards your health goals." />
                <ContentText text="Be open to switching services if your needs are not being met." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Conclusion'/>
                <ContentText text="Finding the right meal prep service requires balancing your health goals, dietary preferences, budget, and convenience. By carefully evaluating your options and paying close attention to customer reviews and nutritional balance, you can find a service that not only helps you manage your weight but also contributes to your overall health and wellbeing. Remember, the best service is one that suits your lifestyle and helps you maintain sustainable, healthy eating habits." />
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

export default MealPrepArticle;