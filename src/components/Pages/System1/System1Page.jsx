import React, { useEffect, useContext, useState, useRef } from 'react';
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
import DebtArticle from './Articles/DebtArticle';
import PersonalInjuryArticle from './Articles/PersonalInjuryArticle';
import AutoWarrantyArticle from './Articles/AutoWarrantyArticle';
import CreditScoreArticle from './Articles/CreditScoreArticle';
import SeniorsArticle from './Articles/SeniorsAtricle';
import AutoFinanceArticle from './Articles/AutoFinanceArticle';
import ButtonContainer from './ButtonContainer';
import MainTitle from './MainTitle';
import { useMutation } from '@apollo/client';
import ADD_USER_EMAIL from './utils/GraphQL/ADD_USER_EMAIL';

const System1Page = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const emailSent = useRef(false);
    const { trackingState, appState } = useContext(AppContext);
    const { header, sub_text, button_title } = appState.system1;
    const [ useArticle, setArticle ] = useState(null);

    useEffect(() => {
        console.log('On Dynamic Page!');
        switch(trackingState.article) {
            case 'credit':
                setArticle(<CreditCardArticle />);
                break;
            case 'loan':
                setArticle(<LoanArticle />);
                break;
            case 'saving':
                setArticle(<SavingsArticle />);
                break;
            case 'tax':
                setArticle(<TaxArticle />);
                break;
            case 'metal':
                setArticle(<MetalsArticle />);
                break;
            case 'life':
                setArticle(<LifeInsuranceArticle />);
                break;
            case 'home':
                setArticle(<HomeWarrantyArticle />);
                break;
            case 'security':
                setArticle(<HomeSecurityArticle />);
                break;
            case 'edu':
                setArticle(<EducationArticle />);
                break;
            case 'debt':
                setArticle(<DebtArticle />);
                break;
            case 'injury':
                setArticle(<PersonalInjuryArticle />);
                break;
            case 'auto':
                setArticle(<AutoWarrantyArticle />);
                break;
            case 'score':
                setArticle(<CreditScoreArticle />);
                break;
            case 'senior':
                setArticle(<SeniorsArticle />);
                break;
            case 'autoloan':
                setArticle(<AutoFinanceArticle />);
                break;
            
            default:
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
                {!!header && <MainTitle text={header} />}
                {!!sub_text && <div style={headerSubStyle}>{sub_text}</div>}
            </div>
            <ButtonContainer containerId='rampjs_slot1' email={trackingState['email']} title={button_title}/>
            {useArticle}
        </div>
    );
};

export default System1Page;