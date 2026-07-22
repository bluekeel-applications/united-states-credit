import React from 'react';
import { getSrcFromHtml } from '../feed-toolz';
import FeaturedList from './FeaturedList';
import styles from './Featured.css.js';
import Radium from 'radium';

const Featured = ({ feedData, styleVariants }) => {

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const fullTitleStyle = Object.assign({}, 
        styles['featuredTitle'],
        styleVariants['featuredTitle']
    );
    
    return (
        <div key='featured-blogs-component' style={styles.component}>
            <div key='row-content' style={styles.contentContainer}>
                <div
                    key='featured-article-container'
                    style={styles.featuredContainer} 
                    onClick={(e) => handleLinkClick(feedData[0].link, e)}
                >
                    <div key='featured-title' style={fullTitleStyle}>
                        {feedData[0].title}
                    </div>
                    <img 
                        key='featured-article-img'
                        style={styles['featuredImage']} 
                        src={getSrcFromHtml(feedData[0].content, true, 'xl')} 
                        alt='featured-article-img' 
                    />
                </div>
                <div key='article-list-container' style={styles.listContainer}>
                    <FeaturedList 
                        key='featured-articles'
                        data={feedData} 
                        styleVariants={styleVariants} 
                        handleClick={handleLinkClick} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Radium(Featured);