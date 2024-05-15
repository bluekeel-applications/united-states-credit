import React, { useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './Articles.css.js';
// import ButtonContainer from '../ButtonContainer';
import ArticleTitle from './components/ArticleTitle';
import ContentText from './components/ContentText';
import RecommendBox from './components/RecommendBox.jsx';

const EducationArticle = () => {
    const { appState } = useContext(AppContext);
    const page = appState.system1;

    return(
        <div style={styles.mainConatiner}>
            <div style={styles.contentContainer}>
                <div>
                In recent years, the popularity of online education has soared, with an increasing number of individuals opting to pursue their degrees through online programs. This paradigm shift in education has brought about numerous benefits, such as flexibility, accessibility, and diverse course offerings. In this article, we will explore the advantages of getting a degree online and provide valuable insights on how to select the best online degree program that aligns with your educational and career goals.
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
                <ArticleTitle text='Flexibility and Convenience'/>
                <ContentText text='One of the primary advantages of obtaining a degree online is the flexibility it offers. Traditional brick-and-mortar institutions often require students to adhere to rigid schedules, making it difficult for individuals with work or family commitments to pursue higher education. Online programs, on the other hand, provide students with the freedom to study at their own pace and on their own schedule. This flexibility allows working professionals to maintain their jobs while acquiring new skills and knowledge that can enhance their career prospects.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Access to a Wide Range of Programs'/>
                <ContentText text='Another significant benefit of online degrees is the extensive range of programs available. Students can choose from an array of disciplines, including business, healthcare, computer science, psychology, and many more. This diversity enables individuals to pursue their passions and interests, regardless of their geographical location. Additionally, online programs often collaborate with industry experts, ensuring that the curriculum remains relevant and up-to-date, giving students the necessary skills to excel in their chosen field.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Geographical Independence'/>
                <ContentText text='By opting for an online degree program, individuals are not limited by geographical constraints. Traditional universities may require students to relocate or commute long distances to attend classes. Online education eliminates these barriers, allowing individuals from different parts of the world to access high-quality education without the need to uproot their lives. This freedom to choose from a global pool of institutions enables students to select the best programs that suit their needs, regardless of the physical location.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Cost-Effectiveness'/>
                <ContentText text='Online degree programs tend to be more cost-effective compared to traditional, on-campus education. Tuition fees for online programs are often lower due to reduced overhead costs for the institutions. Additionally, students can save money by eliminating expenses associated with commuting, housing, and campus facilities. Online learners can study from the comfort of their own homes, which reduces the financial burden typically associated with attending a physical institution.' />
            </div>
            <div style={styles.contentContainer}>
                <ArticleTitle text='Personalized Learning Experience'/>
                <ContentText text="Online degree programs often offer personalized learning experiences that cater to individual students' needs and learning styles. With the availability of multimedia resources, interactive modules, and virtual classrooms, students can tailor their educational journey to suit their preferred method of learning. This flexibility allows individuals to grasp concepts more effectively and achieve better academic outcomes. Furthermore, online platforms often provide access to dedicated support systems, including virtual tutors and mentors, who can provide guidance and assistance throughout the learning process." />
            </div>
            {/* <ButtonContainer containerId='rampjs_slot2' email={trackingState['email']} title='Search and Compare Tax Resolution'/> */}
            <div style={styles.contentContainer}>
                <ArticleTitle text='Choosing the Best Online Degree Program'/>
                <ContentText text="Selecting the right online degree program requires careful consideration of various factors. Here are some key points to keep in mind:" />
                <ContentText title='Accreditation' text="Ensure that the online program and the institution offering it are accredited by recognized accrediting bodies. Accreditation ensures that the program meets specific educational standards, guaranteeing the quality and credibility of the degree." />
                <ContentText title='Reputation and Rankings' text="Research the reputation and rankings of the institution and the specific program you are interested in. Look for reviews, testimonials, and rankings from reputable sources to gauge the program's quality and recognition." />
                <ContentText title='Curriculum and Course Offerings' text="Evaluate the curriculum and course offerings of the program. Ensure that the courses align with your academic and career goals. Look for programs that offer a comprehensive and well-structured curriculum that covers the necessary skills and knowledge in your field of interest." />
                <ContentText title='Faculty and Support' text="Investigate the qualifications and expertise of the faculty members. Look for programs that boast experienced instructors who have practical" />
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

export default EducationArticle;