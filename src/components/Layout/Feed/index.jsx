import React, { Fragment } from 'react';
import ContentTop from '@bit/bluekeel.component-library.content-top';
import styles from './Feed.css.js';
import Usc from '@bit/bluekeel.component-library.usc';
import Featured from '@bit/bluekeel.component-library.featured';
import Knowledge from '@bit/bluekeel.component-library.knowledge';
import Latest from '@bit/bluekeel.component-library.latest';
import Popular from '@bit/bluekeel.component-library.popular';

const Feed = () => {
    const knowledgeFeeds = {
        credit_feed: Usc['credit'], 
        reviews_feed: Usc['reviews'], 
        tips_feed: Usc['tips']
    };

    return (
        <Fragment>
            <ContentTop text={styles.data.topText} />
            <Featured key='featured-row' feedData={Usc.featured} styleVariants={styles.overrideFeatured}/>
            <Knowledge key='knowledge-row' data={knowledgeFeeds} styleVariants={styles.overrideKnowledge}/>
            <Latest key='latest-row' feedData={Usc.latest} styleVariants={styles.overrideLatest}/>
            <Popular key='popular-row' feedData={Usc.popular} styleVariants={styles.overridePopular}/>
        </Fragment>
    );
}

export default Feed;