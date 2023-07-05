import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import styles from './System1.css';
import { useMediaQuery } from 'react-responsive';
import LoanArticle from './Articles/LoanArticle';
import CreditCardArticle from './Articles/CreditCardArticle';
import SavingsArticle from './Articles/SavingsArticle';
import TaxArticle from './Articles/TaxArticle';
import MetalsArticle from './Articles/MetalsArticle';
import LifeInsuranceArticle from './Articles/LifeInsuranceArticle';
import HomeWarrantyArticle from './Articles/HomeWarrantyArticle';
import HomeSecurityArticle from './Articles/HomeSecurityArtilce';
import EducationArticle from './Articles/EducationArticle';
import ButtonContainer from './ButtonContainer';
import MainTitle from './MainTitle';

const System1 = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState } = useContext(AppContext);
    const [ headerText, setHeaderText ] = useState(null);
    const [ headerSubText, setHeaderSubText ] = useState(null);
    const [ buttonQuestion, setButtonQuestion ] = useState(null);
    const [ useArticle, setArticle ] = useState(null);

    useEffect(() => {
        switch(trackingState.article) {
            case 'credit':
                setHeaderText('The Best Credit Cards in 2023 for Any Credit Type');
                setHeaderSubText('Finding the perfect credit card can extend our spending abilities and help us manage our personal finances.  Use the buttons below to search for and compare the best credit card options currently available.');
                setButtonQuestion('Search and Compare Credit Cards');
                setArticle(<CreditCardArticle />);
                break;
            case 'loan':
                setHeaderText('Find the Best Loans in 2023 from $500-$20,000');
                setHeaderSubText('Finding the right personal loan can save you money, provide you with financial flexibility and improve your credit score.   Use the buttons below to search for and compare the best personal loan options.');
                setButtonQuestion('Search and Compare Personal Loans');
                setArticle(<LoanArticle />);
                break;
            case 'saving':
                setHeaderText('Earn $1,000s in Passive Income with a High Yield Savings Account');
                setHeaderSubText('A high yield savings account is a safe and effective way to maximize your earnings on interest.  Use the buttons below to search for and compare banks with the highest yield on savings, and start adding $1,000s per year in passive income.');
                setButtonQuestion('Search and Compare High Yield Savings');
                setArticle(<SavingsArticle />);
                break;
            case 'tax':
                setHeaderText('Eliminate $1,000s in Tax Debt and Stop Harassment from the IRS');
                setHeaderSubText('Tax resolution offers just about anyone the ability to lower, if not eliminate, past tax debt.  Use the buttons below to search for and compare the top tax resolution companies and hit the reset button on past taxes.  Most credible services provide a 100% money back guarantee.');
                setButtonQuestion('Search and Compare Tax Resolution');
                setArticle(<TaxArticle />);
                break;
            case 'metal':
                setHeaderText('Safeguard and Preserve Your Wealth By Investing In Precious Metals');
                setHeaderSubText('Buying precious metals can preserve wealth, act as a hedge against inflation, and offer diversification benefits for investment portfolios.   Use the buttons below to search for and compare the best deals on purchasing gold, silver and other precious metals.');
                setButtonQuestion('Search and Compare Precious Metals');
                setArticle(<MetalsArticle />);
                break;
            case 'life':
                setHeaderText('Find The Best, Low Cost Life Insurance Policy');
                setHeaderSubText('Life Insurance is an inexpensive, yet essential financial tool that provides protection and peace of mind for individuals and their loved ones.  Use the buttons below to search for and compare the top life insurance companies and secure peace of mind and a lasting legacy for those you care about.');
                setButtonQuestion('Search and Compare Life Insurance');
                setArticle(<LifeInsuranceArticle />);
                break;
            case 'home':
                setHeaderText('How to Find the Perfect Home Warranty on Any Budget');
                setHeaderSubText('A home warranty is an invaluable, cost effective way to protect yourself from unexpected expenses. Use the buttons below to search for and compare top home warranty offers and gain an important peace of mind.');
                setButtonQuestion('Search and Compare Home Warranties');
                setArticle(<HomeWarrantyArticle />);
                break;
            case 'security':
                setHeaderText('Find The Best Home Security Systems of 2023');
                setHeaderSubText('A home security system is an essential, yet cost effective tool for protecting our loved ones and our valuable belongings. Use the buttons below to search for and compare top home security systems and gain an important peace of mind.');
                setButtonQuestion('Search and Compare Home Security');
                setArticle(<HomeSecurityArticle />);
                break;
            case 'edu':
                setHeaderText('Double Your Income With an Online Degree');
                setHeaderSubText('Those with college degrees earn an additional $1.2 million dollars in their lifetime. It’s a cost effective alternative to a 4 year University and takes only a few hours a week. Use the buttons below to search for and compare top online universities and degree programs.');
                setButtonQuestion('Search and Compare Online Degrees');
                setArticle(<EducationArticle />);
                break;
            
            default:
                setHeaderText(null);
                setHeaderSubText(null);
                setButtonQuestion('What are you interested in?');
                setArticle(<CreditCardArticle />);
        }
    },[trackingState.article]);

    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log('Email posted to Mongo:', submittedEmail);
        }
    });

    const postEmailToMongo = emailProp => {
        if(emailProp && emailProp !== '' && emailProp !== 'omit') {
            addUserEmail({
                variables: {
                    clickId: Number(trackingState['hsid']),
                    email: emailProp
                }
            })
        }
    };

    useEffect(() => {
        if(!emailSent.current) {
            postEmailToMongo(trackingState['email']);
            emailSent.current = true;
        };
        // eslint-disable-next-line
    },[emailSent.current]);
    
    useEffect(() => {
        window.fbq('init', '531202445442265');
        console.log('Initialized FB Pixel');
    },[]);

    const headerStyle = Object.assign({},
        styles.headerContainer,
        isMobile && styles.headerContainerMobile
    );
    const headerSubStyle = Object.assign({},
        styles.headerText,
        isMobile && styles.headerTextMobile
    );

    return(
        <div style={styles.mainContainer}>
            <div style={headerStyle}>
                {!!headerText && <MainTitle text={headerText} />}
                {!!headerSubText && <div style={headerSubStyle}>{headerSubText}</div>}
            </div>
            <ButtonContainer containerId='rampjs_slot1' email={trackingState['email']} title={buttonQuestion}/>
            {useArticle}
        </div>
    );
};

export default System1;

//     const [ addLoadTime ] = useMutation(ADD_LOAD_TIME, { 
// 		onCompleted: (data) => console.log(data.addLoadTime.message) 
// 	});

//     const getIpData = async () => {
//         const res = await axios.get('https://api.ipify.org/?format=json');
//         setIP(res.data.ip);
//     };

//     const sendDelta = () => {
//         const diffTime = Math.abs(end.current - start.current);
//         addLoadTime({
//             variables: {
//                 user_ip: ip,
//                 delta: diffTime,
//                 subid: trackingState.subid,
//                 segment: trackingState.segment,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             }
//         });
//     };

//     useEffect(() => {
//         if(!ip) {
//             //passing getData method to the lifecycle method
//             getIpData();
//         }
//     }, [ip]);

//     useEffect(() => {
//         if(!!end.current && !!ip && !deltaSent.current) {
//             deltaSent.current = true;
//             sendDelta();
//         };
// // eslint-disable-next-line
//     },[end, ip]);