import React, { useState } from 'react';
import styles from '../Articles.css';
import ContentText from './ContentText';
import ArticleTitle from './ArticleTitle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecommendBox = ({titleText, text, offerUrl}) => {
    const [ isHovering, setHovering ] = useState(false);
    const handleOfferClick = () => {
        window.open(offerUrl, "_blank");
    };

    const buttStyle = Object.assign({}, 
        styles['offerButton'],
        isHovering && styles['offerHover'],
    );

    return(
        <div style={styles.recOfferContainer}>
            <div style={styles.recTitleContainer}>
                <FontAwesomeIcon
                    icon={['fal', 'trophy-star']}
                    style={styles.recIcon}
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