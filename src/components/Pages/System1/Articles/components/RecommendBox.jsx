import React, { useState } from 'react';
import styles from '../Articles.css';
import ContentText from './ContentText';
import ArticleTitle from './ArticleTitle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';

const RecommendBox = ({titleText, text, offerUrl}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [ isHovering, setHovering ] = useState(false);
    const handleOfferClick = () => {
        window.open(offerUrl, "_blank");
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
                <ArticleTitle text="Editor's Choice: United Loan" />
            </div>
            <ContentText title={titleText} text={text} />
            <div style={styles.offerButtonContainer}>
                <button 
                    onClick={handleOfferClick} 
                    style={buttStyle}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    See Offer
                !</button>
            </div>
        </div>
    )
};

export default RecommendBox;