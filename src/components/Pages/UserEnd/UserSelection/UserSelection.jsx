import React, { Component, useState, useEffect, memo } from 'react';
import styles from './UserSelection.css.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuickLinks from './QuickLinks';
import LegalTerms from './LegalTerms';
import SearchInput from './SearchInput';
import LoanArticle from './LoanArticle';
import { useNavigate } from 'react-router-dom';
import useClickSubmit from '../../../../utils/hooks/useClickSubmit.js';
import useInsightSubmit from '../../../../utils/hooks/useInsightSubmit.js';
import { buildKeywordLink, flattenLongString } from '../../../../utils/helpers.js';
import Radium from 'radium';
import OfferGroup from '../OfferGroup';
import { useMediaQuery } from 'react-responsive';

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    render() {
        return (
            <ins
                className='adsbygoogle'
                data-ad-client='ca-pub-5105418052368941'
                data-ad-slot={this.props.isMobile ? '4039041459' : '2474678347'}
                style={{ 
                    display: 'inline-block', 
                    width: this.props.width, 
                    height: this.props.height 
                }}
                data-ad-format='auto'
                data-full-width-responsive='true'
            />
        );
    }
};

const UserSelection = Radium(({ theme, offer, tracking, email }) => {
    let navigate = useNavigate();
    const [ showAd, setShowAd ] = useState(false);
    const [ showArticle, setShowArticle ] = useState(false);
    const [ disabled, setDisabledState ] = useState(true);
    const [ interest, setInterest ] = useState('');
    const [ shouldExecute, setExecute ] = useState(false);
    const [ showOfferGroup, setOfferGroup ] = useState(null);

    useClickSubmit(tracking, email, shouldExecute);
    useInsightSubmit(interest, tracking, shouldExecute);

    useEffect(() => {
        const showTypes = ['test1', 'loansgpaid'];
        const type = tracking.loan_type;
		if(showTypes.includes(type)) { 
            setShowArticle(true);
            console.log('Showing article in quicklink component!');
        };
	},[tracking.loan_type]);

    useEffect(() => {
        const percent = 100;
		const count = getRandomIntInclusive(0, 100);
		if(count <= percent) { 
            setShowAd(true);
            console.log('Showing ad in quicklink component!');
        };
	},[]);

    const handleInputChange = (event) => {
        let interestValue = event.target.value;
        const query = flattenLongString(interestValue);
        setInterest(query);
        if (interestValue !== '') {
            setDisabledState(false);
            return;
        };
        setDisabledState(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(disabled) return;
        setExecute(true);
        const linkout = buildKeywordLink(offer.url, tracking, interest);
        const jumpBehind = buildKeywordLink(offer.jump, tracking, interest);
        let newTab = window.open();
        newTab.location = linkout;
        if (jumpBehind && jumpBehind !== 'N/A') {
            window.location.href = jumpBehind;
        } else {
            navigate('/verticals');
        };      
    };

    const AdSenseComp = () => {
        const isMobile = useMediaQuery({ maxWidth: 767 });
    
        const [ adWidth ] = useState(() => {
            let windowWidth = window.innerWidth;
            if(windowWidth > 1800) { return 1800 };
            if(isMobile) { return (windowWidth - 40) };
            return windowWidth - 100;
        });
        const [ adHeight ] = useState(() => {
            let windowWidth = window.innerWidth;
            if(windowWidth > 1800) { return 720 };
            if(isMobile) { return (windowWidth - 40) };
            return ((windowWidth - 100)*0.8);
        });
    
        const mainStyle = Object.assign(
            styles.adContainer,
            isMobile && styles.mobileAdContainer
        );
    
        return (
            <div style={mainStyle}>
                <GoogleAd 
                    width={adWidth}
                    height={adHeight}
                    isMobile={isMobile}
                />
            </div>
        );
    
    };

    const themedButton = Object.assign({},
        styles['submitButton'],
        styles[`${theme}Button`]
    );
    
    if(!!showOfferGroup){
        return (
            <OfferGroup 
                program_id={offer.program_id}
                offer_group={showOfferGroup}
                theme={theme}
                tracking={tracking}
                email={email}
            />
        )
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.formCard}>
                <div style={styles.titleText}>{`${offer.question_text || 'What are you interested in?'}`}</div>
                <form style={styles.formContainer} onSubmit={handleFormSubmit}>
                    <QuickLinks 
                        quickLinks={offer.selection_links}
                        theme={theme}
                        tracking={tracking}
                        email={email}
                        setOfferGroup={setOfferGroup}
                        program_id={offer.program_id}
                    />
                    {offer.show_search && <SearchInput 
                        value={interest}
                        handleChange={handleInputChange}
                        name='Search'
                    />}
                    <LegalTerms email={email} hasInput={offer.show_search}/>
                    {offer.show_search && 
                        <div style={styles.buttonGroup}>
                            <button
                                type='submit'
                                style={disabled ? styles['disabledButton'] : themedButton}
                            >
                                <span style={styles.buttonText}>Next</span>
                                <FontAwesomeIcon
                                    icon={['fal', 'angle-double-right']}
                                    style={styles.buttonIcon}
                                />
                            </button>
                        </div>
                    }
                </form>
            </div>
            {showAd && <AdSenseComp />}
            {showArticle && <LoanArticle />}
        </div>
    )
});

export default memo(UserSelection);