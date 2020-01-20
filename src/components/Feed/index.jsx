import React from 'react';
import ContentTop from './ContentTop';
import EditorialRow from './EditorialRow';
import FeaturedRow from './FeaturedRow';
import InfoRow from './InfoRow';
import LatestRow from './LatestRow';
import PopularRow from './PopularRow';
import Fade from 'react-reveal/Fade';

const Feed = () => (
    <Fade bottom>
        <div className='feed-container'>
            <ContentTop />
            <FeaturedRow />
            <InfoRow />
            <EditorialRow />
            <LatestRow />
            <PopularRow />
        </div>
    </Fade>
);

export default Feed;