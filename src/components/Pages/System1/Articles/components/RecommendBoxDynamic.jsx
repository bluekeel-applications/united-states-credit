import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../../context';
import styles from '../Articles.css';
import ContentText from './ContentText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';

const RecommendBoxDynamic = ({number}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [ isHovering, setHovering ] = useState(false);
    const [ fullUrl, setUrl ] = useState(null);
    const { trackingState, appState } = useContext(AppContext);
    const page = appState.system1;
    const offer = `offer${number}`;
    const offerUrl = isMobile ? page?.mobile?.[offer]?.offer_url : page?.[offer]?.offer_url;
    const mainTitle = isMobile ? page?.mobile?.[offer]?.main_title : page?.[offer]?.main_title;
    const titleText = isMobile ? page?.mobile?.[offer]?.sub_title : page?.[offer]?.sub_title;
    const text = isMobile ? page?.mobile?.[offer]?.sub_text : page?.[offer]?.sub_text;
    const cta = isMobile ? page?.mobile?.[offer]?.cta : page?.[offer]?.cta;
    const location = isMobile ? 'mobile' : 'desktop';

    useEffect(() => {
        var url = new URL(offerUrl);
        var search_params = url.searchParams;
        search_params.set('eid', `${location}-${trackingState.sid}`);
        url.search = search_params.toString();
        var new_url = url.toString();
        setUrl(new_url);
        // eslint-disable-next-line
    },[]);

    const handleOfferClick = () => {
        window.open(fullUrl, "_blank");
    };

    const iconContainerStyle = Object.assign({},
        styles.recTitleContainer,
        isMobile && {alignItems: 'center'}
    );
    const iconStyle = Object.assign({},
        styles.recIcon,
        isMobile && {fontSize: '2rem'}
    );

    const buttStyle = Object.assign({}, 
        styles['offerButton'],
        isHovering && styles['offerHover'],
    );

    return(
        <div style={styles.recOfferContainer}>
            <div style={iconContainerStyle}>
                <FontAwesomeIcon
                    icon={['fal', 'trophy-star']}
                    style={iconStyle}
                />
                <div style={{...styles.title, padding: '0'}}>
                    {mainTitle}
                </div>
            </div>
            <ContentText title={titleText} text={text} />
            <div style={styles.offerButtonContainer}>
                <button 
                    onClick={handleOfferClick} 
                    style={buttStyle}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {cta}
                </button>
            </div>
        </div>
    )
};

export default RecommendBoxDynamic;