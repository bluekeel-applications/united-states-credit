import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../../context';
import styles from '../Articles.css';
import ContentText from './ContentText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';

const RecommendBox = ({mainTitle, titleText, text, offerUrl, cta, location}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [ isHovering, setHovering ] = useState(false);
    const [ fullUrl, setUrl ] = useState(null);
    const { trackingState } = useContext(AppContext);

    useEffect(() => {
        var url = new URL(offerUrl);
        var search_params = url.searchParams;
        search_params.set('eid', `${location}-${trackingState.sid}`);
        url.search = search_params.toString();
        var new_url = url.toString();
        setUrl(new_url);
    },[]);

    const handleOfferClick = () => {
        window.open(fullUrl, "_blank");
    };

    const iconContainerStyle = Object.assign(
        styles.recTitleContainer,
        isMobile && {alignItems: 'center'}
    );
    const iconStyle = Object.assign(
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

export default RecommendBox;