import React from 'react';
import ContentTop from '@bit/bluekeel.component-library.content-top';
import styles from './Feed.css.js';
import Usc from '@bit/bluekeel.component-library.usc';
import Featured from '@bit/bluekeel.component-library.featured';
import Knowledge from '@bit/bluekeel.component-library.knowledge';
import Editorial from '@bit/bluekeel.component-library.editorial';
import Latest from '@bit/bluekeel.component-library.latest';
import Popular from '@bit/bluekeel.component-library.popular';
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