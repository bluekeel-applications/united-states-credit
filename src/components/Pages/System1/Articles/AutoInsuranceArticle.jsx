import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText.jsx';
import RecommendBox from './components/RecommendBox.jsx';

const AutoInsuranceArticle = () => {
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
                <ArticleTitle text="Here's how:"/>
                <ContentText title='1. Shop Around and Compare Rates:' text="Don't settle for the first insurance quote you receive. Premiums can vary considerably among providers, so it's essential to compare rates from multiple insurers. Utilize online comparison tools or consult with an independent agent to find the best deal." />
                <ContentText title='2. Bundle Your Policies:' text="Many insurance companies offer discounts if you bundle your auto insurance with other policies, such as homeowners or renters insurance. This can lead to substantial savings across your insurance portfolio." />
                <ContentText title='3. Increase Your Deductible:' text="Opting for a higher deductible can lower your premium costs. However, ensure you choose a deductible amount you can afford in the event of a claim." />
                <ContentText title='4. Maintain a Good Driving Record:' text="Safe driving not only protects you and others on the road but also saves you money. Drivers with clean records often qualify for lower rates and may be eligible for additional safe driver discounts." />
                <ContentText title='5. Take Advantage of Discounts:' text="Insurers offer a variety of discounts, so ask your provider about any you may qualify for. Common discounts include those for good students, low mileage drivers, and vehicles equipped with safety features." />
                <ContentText title='6. Choose Your Vehicle Wisely:' text="The type of vehicle you drive impacts your insurance costs. Generally, safer and less expensive vehicles are cheaper to insure. Before purchasing a car, research its insurance rates to avoid unexpected costs." />
                <ContentText title='7. Review Your Policy Regularly:' text="As your life circumstances change, so do your insurance needs. Regularly reviewing your policy ensures you're not overpaying for coverage you don't need. Additionally, keep your insurer updated on any significant changes, such as moving to a safer neighborhood or switching to a job with a shorter commute." />
                <ContentText title='8. Consider Usage-Based Insurance:' text="If you're a low-mileage or safe driver, usage-based insurance programs can offer significant savings. These programs track your driving habits and adjust your premiums accordingly." />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text="Bringing It All Together"/> 
                <ContentText text="By implementing these strategies, you can achieve meaningful savings on your auto insurance without compromising on coverage. Remember, the key is to stay informed, shop around, and ask about discounts to find the best rates tailored to your needs." />
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

export default AutoInsuranceArticle;