import React from 'react';
import LoanArticle from '../Articles/LoanArticle';
import CreditCardArticle from '../Articles/CreditCardArticle';
import SavingsArticle from '../Articles/SavingsArticle';
import TaxArticle from '../Articles/TaxArticle';
import MetalsArticle from '../Articles/MetalsArticle';
import LifeInsuranceArticle from '../Articles/LifeInsuranceArticle';
import HomeWarrantyArticle from '../Articles/HomeWarrantyArticle';
import HomeSecurityArticle from '../Articles/HomeSecurityArtilce';
import EducationArticle from '../Articles/EducationArticle';
import DebtArticle from '../Articles/DebtArticle';
import PersonalInjuryArticle from '../Articles/PersonalInjuryArticle';
import AutoWarrantyArticle from '../Articles/AutoWarrantyArticle';
import CreditScoreArticle from '../Articles/CreditScoreArticle';
import SeniorsArticle from '../Articles/SeniorsAtricle';
import AutoFinanceArticle from '../Articles/AutoFinanceArticle';
import DentalArticle from '../Articles/DentalArticle';
import SolarArticle from '../Articles/SolarArticle';
import MealPrepArticle from '../Articles/MealPrepArticle';
import CheckingArticle from '../Articles/CheckingArticle';
import MortgageArticle from '../Articles/MortgageArticle';
import HondaArticle from '../Articles/HondaArticle';
import EVArticle from '../Articles/EVArticle';
import AutoInsuranceArticle from '../Articles/AutoInsuranceArticle';
import BoTArticle from '../Articles/BoTArticle';

export const buildFullURL = (buttonArr, trackingState) => {
    const keys = ['&forceKeyA=', '&forceKeyB=', '&forceKeyC=', '&forceKeyD=', '&forceKeyE=', '&forceKeyF=', '&forceKeyG=']
    const encodeArr = buttonArr.map((button) => {
      return button.trim().replace(/ /g,"+").replace("$","%24");
    });
    const keyArr = encodeArr.map((item, idx) => {
      return `${keys[idx]}${item}`;
    });
    const forceKeys = keyArr.join("");
    const searchTrack = `search_track_url=https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod/optin/${trackingState.hsid}`;
    const clickTrack = `click_track_url=http://www.bkoffers.com/hitstreet/pixel_fire.cfm?hsid=${trackingState.hsid}`;
    const subId = `subid=${trackingState.sid}-${trackingState.eid}`;
    const taboola = `tbid=1648456&tbclickid=${trackingState.uid}&tbland=PageView&tbserp=add_to_wishlist&tbclick=Purchase`;
    const facebook = `fbid=531202445442265&fbclick=Search`;
    const google = `gamid=AW-11025885187&gclcid=AW-11025885187/kAMpCK_99IIYEIPQxokp`;
    return `${forceKeys}&${searchTrack}&${clickTrack}&${subId}&${taboola}&${facebook}&${google}`;
};

export const setDefaultData = (trackingState) => {
    const forceKeys = '&forceKeyA=Credit+Cards+No+Credit&forceKeyB=Credit+Cards+for+Fair+Credit+Instant+Approval&forceKeyC=Best+Credit+Cards+for+Fair+Credit&forceKeyD=Best+Credit+Cards+to+Build+Credit&forceKeyE=Cash+Back+Credit+Cards&forceKeyF=Best+Rewards+Credit+Card+for+Travel';
    const searchTrack = `search_track_url=https://f8fjn5bgw2.execute-api.us-east-1.amazonaws.com/prod/optin/${trackingState.hsid}`;
    const article = 'article=credit';
    const segment = 'segment=c2sunitedstatescredit0005';
    const clickTrack = `click_track_url=http://www.bkoffers.com/hitstreet/pixel_fire.cfm?hsid=${trackingState.hsid}`;
    const subId = `subid=${trackingState.sid}-${trackingState.eid}`;
    const taboola = `tbid=1648456&tbclickid=${trackingState.uid}&tbland=PageView&tbserp=add_to_wishlist&tbclick=Purchase`;
    const facebook = `fbid=531202445442265&fbclick=Search`;
    const trackingVars = `email=omit&hsid=234820821&pid=3420&sid=9582&oid=40&uid=yourUID&eid=yourEID`;
    const google = `gamid=AW-11025885187&gclcid=AW-11025885187/kAMpCK_99IIYEIPQxokp`;
    return `?${searchTrack}&${article}&${clickTrack}&${segment}&${subId}&${facebook}&${google}&${forceKeys}&${taboola}&${trackingVars}`;
};

export const setPageComponent = (article, setArticle) => {
    switch(article) {
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
        case 'dental':
            setArticle(<DentalArticle />);
            break;
        case 'solar':
            setArticle(<SolarArticle />);
            break;
        case 'meal':
            setArticle(<MealPrepArticle />);
            break;
        case 'checking':
            setArticle(<CheckingArticle />);
            break;
        case 'mortgage':
            setArticle(<MortgageArticle />);
            break;
        case 'honda':
            setArticle(<HondaArticle />);
            break;
        case 'ev':
            setArticle(<EVArticle />);
            break;
        case 'autoinsurance':
            setArticle(<AutoInsuranceArticle />);
            break;
        case 'bot':
            setArticle(<BoTArticle />);
            break;
        
        default:
            setArticle(<CreditCardArticle />);
    }
};