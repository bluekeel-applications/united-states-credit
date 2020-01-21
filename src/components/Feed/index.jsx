import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context';
import ContentTop from './ContentTop';
import EditorialRow from './EditorialRow';
import FeaturedRow from './FeaturedRow';
import InfoRow from './InfoRow';
import LatestRow from './LatestRow';
import PopularRow from './PopularRow';
import Fade from 'react-reveal/Fade';
import { 
    fetchFeatured,
    fetchTips,
    fetchCredit,
    fetchReviews,
    fetchFeed
} from '../../utils/feedTools';

const Feed = () => {
    const componentIsMounted = useRef(true);
    const { feedState, dispatchFeed } = useContext(AppContext);
    const { featured, tips, credit, reviews, feed, loadingFeed } = feedState;
    useEffect(() => {  
        const fetchFeeds = async(y) => {
            const featuredData = await fetchFeatured();
            dispatchFeed({ type: 'FETCHED_FEATURED_FEED', payload: featuredData });
            const tipsData = await fetchTips();
            dispatchFeed({ type: 'FETCHED_TIPS_FEED', payload: tipsData });
            const creditData = await fetchCredit();
            dispatchFeed({ type: 'FETCHED_CREDIT_FEED', payload: creditData });
            const reviewsData = await fetchReviews();
            dispatchFeed({ type: 'FETCHED_REVIEW_FEED', payload: reviewsData });
            const feedData = await fetchFeed();
            dispatchFeed({ type: 'FETCHED_FEED', payload: feedData });            
        } 
        if(componentIsMounted.current) {
            fetchFeeds();
        };
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, [featured, tips, credit, reviews, feed])

    if(featured && tips && credit && reviews && feed && loadingFeed) {
        dispatchFeed({ type: 'FETCH_FEED_SUCCESS' });
    };

    if(loadingFeed) {
        return (
            <div>Loading</div>
        )
    };

    return (
        feedState.feed.length > 0 && (
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
        )
    )
}

export default Feed;