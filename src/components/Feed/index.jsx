import React, { useContext } from 'react';
import { AppContext } from '../../context';
import useRssFeed from '../../hooks/useRssFeed';
import Loading from '../Shared/Loading';
import ContentTop from './ContentTop';
import EditorialRow from './EditorialRow';
import FeaturedRow from './FeaturedRow';
import InfoRow from './InfoRow';
import LatestRow from './LatestRow';
import PopularRow from './PopularRow';

const Feed = () => {
    useRssFeed();
    const { feedState } = useContext(AppContext);

    return (
        <div className='feed-container'>
            <ContentTop />
            {!feedState.loadingFeatured && feedState.featured ? <FeaturedRow /> : <div className='feed_loader'><Loading /></div>}
            {!feedState.loadingTips && feedState.tips ? <InfoRow /> : <div className='feed_loader'><Loading /></div>}
            {!feedState.loadingCredit && feedState.credit ? <EditorialRow /> : <div className='feed_loader'><Loading /></div>}
            {!feedState.loadingReviews && feedState.reviews ? <LatestRow /> : <div className='feed_loader'><Loading /></div>}
            {!feedState.loadingFeed && feedState.feed ? <PopularRow /> : <div className='feed_loader'><Loading /></div>}
        </div>
    )
}

export default Feed;