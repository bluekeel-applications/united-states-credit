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
        let linkShape = null;
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        console.log('randomNumber', randomNumber);
        // Loop the offer array and set the offer url
        offer_array.forEach((offer_obj, idx) => {
            // If an offer is already set, return
            if(!!offerUrl) {
                return;
            };
            // start count
            count += Number(offer_obj.usage);
            // if(idx === 0) {
            //     count = Number(offer_obj.usage);
            // };
            // If the random number is less than or equal to the count, set the offer url
            if(randomNumber <= count && !offerUrl) {
                offerUrl = offer_obj.offer_url;
                linkShape = offer_obj.link_shape;
            };
            // Increment the count
            // if(idx !== 0) {
            //     count += Number(offer_obj.usage);
            // };
            // If this is the last offer and no offer url is set, set the offer url
            if(idx === offer_array.length - 1 && !offerUrl) {
                offerUrl = offer_obj.offer_url;
                linkShape = offer_obj.link_shape;
            };
        });
        console.log('offerUrl', offerUrl);
        console.log('linkShape', linkShape);
        return {offerUrl, linkShape};
    };
    const SelectOffers = (data) => {
        const offerArray = data.map((offer_obj) => {
            let text = offer_obj.button_text;
            let {offerUrl, linkShape} = findOfferUrl(offer_obj.offers);
            return {
                text,
                url: offerUrl,
                linkShape
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

    const buildLinkout = (url, shape) => {
        var url_base = new URL(url);
        var search_params = url_base.searchParams;
        search_params.set('eid', `${trackingState.pid}-${trackingState.sid}-${trackingState.eid}`);
        var new_url = url_base.toString();
        
        const buildDefault = () => {
            return `${new_url}&subid2=${trackingState.hsid}`;
        };

        const buildTapstone = () => {
            const subId = `subid=${trackingState.sid}-${trackingState.eid}`;
            const facebook = `src=${!!trackingState.fbid ? trackingState.fbid : '202255056230822'}`;
            const clickid = `clickid=${trackingState.hsid}`;
            return `${new_url}?dpco=1&${subId}&${facebook}&${clickid}&subid2=${trackingState.hsid}`;
        };
    
        const buildPeak = () => {
            const s1 = `s1=${trackingState.sid}`;
            const s2 = `s2=${trackingState.eid}`;
            const s3 = `s3=${trackingState.hsid}`;
            // const pidPeak = `pid=${!!trackingState.fbid ? trackingState.fbid : '202255056230822'}`;
            const pclid = `pclid=${trackingState.uid}`;
            const subid2 = `subid2=${trackingState.hsid}`;
            // const pec = `pec=Search`;
            return `${new_url}&${s1}&${s2}&${s3}&${pclid}&${subid2}`;
        };

        switch(shape) {
            case 'tapstone':
                return buildTapstone();
            case 'peak':
                return buildPeak();
            default:
                return buildDefault();
        };

    };
    const BlockOffer = ({ offerItem }) => {
        const [ isHovering, setHovering ] = useState(false);
        const handleOfferClick = () => {
            setExecute(true);
            // Add fbpixel fire
            window.fbq('init', '1129397548111416');
            window.fbq('track', 'Search');
            const new_url = buildLinkout(offerItem.url, offerItem.linkShape);
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
            <div style={styles.buttonBlockContainer}>
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