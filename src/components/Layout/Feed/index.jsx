import React from 'react';
import ContentTop from './ContentTop';
import styles from './Feed.css.js';
import Usc from './USC';
import Featured from './Featured';
import Knowledge from './Knowledge';
import Editorial from './Editorial';
import Latest from './Latest';
import Popular from './Popular';
import Radium from 'radium';

const Feed = () => {
    const knowledgeFeeds = {
        credit_feed: Usc['credit'], 
        reviews_feed: Usc['reviews'], 
        tips_feed: Usc['tips']
    };

    return (
        <div style={styles.feed}>
            <ContentTop key='content-top-usc' text={styles.data.topText} />
            <Featured key='featured-row' feedData={Usc.featured} styleVariants={styles.overrideFeatured}/>
            <Knowledge key='knowledge-row' data={knowledgeFeeds} styleVariants={styles.overrideKnowledge}/>
            <Editorial key='editorial-row' feedData={Usc.featured} styleVariants={styles.overrideEditorial}/>
            <Latest key='latest-row' feedData={Usc.latest} styleVariants={styles.overrideLatest}/>
            <Popular key='popular-row' feedData={Usc.popular} styleVariants={styles.overridePopular}/>
        </div>
    );
}

export default Radium(Feed);