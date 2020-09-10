import React from 'react';
import ContentTop from './components/ContentTop';
import EditorialRow from './components/EditorialRow';
import FeaturedRow from './components/FeaturedRow';
import InfoRow from './components/InfoRow';
import LatestRow from './components/LatestRow';
import PopularRow from './components/PopularRow';

const BlogFeed = ({ host }) => {
    
    return (
        <div className='page-container'>
            <div className='feed-container'>
                <ContentTop domain={host} />
                <FeaturedRow />
                <InfoRow />
                <EditorialRow />
                <LatestRow />
                <PopularRow />
            </div>
        </div>
    );
}

export default BlogFeed;