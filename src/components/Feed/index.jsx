import React from 'react';
import ContentTop from './ContentTop';
import EditorialRow from './EditorialRow';
import FeaturedRow from './FeaturedRow';
import InfoRow from './InfoRow';
import LatestRow from './LatestRow';
import PopularRow from './PopularRow';
import Footer from './Footer';

const Feed = () => (
    <div className='feed-container'>
        <ContentTop />
        <FeaturedRow />
        <InfoRow />
        <EditorialRow />
        <LatestRow />
        <PopularRow />
        <Footer />
    </div>
);

export default Feed;