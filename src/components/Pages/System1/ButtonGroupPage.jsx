import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import styles from './System1.css';
import { useMediaQuery } from 'react-responsive';
import LegalTerms from './Articles/components/LegalTerms';
import MainTitle from './Articles/components/MainTitle';
import { setPageComponent } from './utils/helpers';
import useClickSubmit from '../../../utils/hooks/useClickSubmit';

const ButtonGroupPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState, appState } = useContext(AppContext);
    const { header, sub_text, button_group, mobile } = appState.system1;
    const [ useArticle, setArticle ] = useState(null);
    const [ activeData, setActiveData ] = useState(null);
    const [ shouldExecute, setExecute ] = useState(false);

    useClickSubmit(trackingState, trackingState.email, shouldExecute);

    useEffect(() => {
        setPageComponent(trackingState.article, setArticle);
    },[trackingState.article]);

    useEffect(() => {
        const facebookId = !!trackingState.fbid ? trackingState.fbid : '531202445442265';
        window.fbq('init', facebookId);
        // window.fbq('init', '1129397548111416');
        console.log('Initialized FB Pixel');
        window.liQ = window.liQ || [];
        window.liQ.push({
            "event": "viewContent",
            "name": "lead"
        });
        console.log('Initialized Live Intent Pixel');
        // eslint-disable-next-line
    },[]);

    const findOfferUrl = (offer_array) => {
        let count = 0;
        let offerUrl = null;
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        offer_array.forEach((offer_obj, idx) => {
            // start count
            if(idx === 0) {
                count = offer_obj.usage;
            };
            if(randomNumber <= count) {
                offerUrl = offer_obj.offer_url;
            };
            if(idx !== 0) {
                count += offer_obj.usage;
            };
        });
        return offerUrl;
    };
    const SelectOffers = (data) => {
        const offerArray = data.map((offer_obj) => {
            let text = offer_obj.button_text;
            let url = findOfferUrl(offer_obj.offers);
            return {
                text,
                url
            }
        });
        return offerArray;
    };

    useEffect(() => {
        let rawData = null;
        if(isMobile && !!mobile.button_group) {
            rawData = mobile.button_group;
        } else {
            rawData = button_group;
        };
        setActiveData(SelectOffers(rawData));
        // eslint-disable-next-line
    },[]);

    const headerStyle = Object.assign({},
        styles.headerContainer,
        isMobile && styles.headerContainerMobile
    );
    const headerSubStyle = Object.assign({},
        styles.headerText,
        isMobile && styles.headerTextMobile
    );

    const BlockOffer = ({ offerItem }) => {
        const [ isHovering, setHovering ] = useState(false);
        
        const handleOfferClick = () => {
            setExecute(true);
            var url = new URL(offerItem.url);
            var search_params = url.searchParams;
            search_params.set('eid', `block-${trackingState.sid}-${trackingState.eid}`);
            url.search = search_params.toString();
            var new_url = url.toString();
            let newTab = window.open();
            newTab.location = new_url;
        };

        const buttStyle = Object.assign({}, 
            styles['blockOfferButton'],
            isHovering && styles['offerHover'],
        );

        return(
            <div style={styles.blockOfferContainer}>
                <button 
                    onClick={handleOfferClick} 
                    style={buttStyle}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {offerItem.text}
                </button>
            </div>
        )
    };

    if(!activeData) { 
        return null; 
    };

    return(
        <div style={styles.mainContainer}>
            <div style={headerStyle}>
                {!!header && <MainTitle text={header} />}
                {!!sub_text && <div style={headerSubStyle}>{sub_text}</div>}
            </div>
            <div style={styles.blockContainer}>
                <div style={styles.blockTitle}>Exclusive Offers!</div>
                <div style={styles.blockOffersListContainer}>
                    {activeData.map((offer, idx) => <BlockOffer key={`button-offer-item-${idx}`} offerItem={offer}/>)}
                </div>
                <LegalTerms email={trackingState.email} />
            </div>
            {useArticle}
        </div>
    );
};

export default ButtonGroupPage;