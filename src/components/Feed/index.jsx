import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context';
import ContentTop from './ContentTop';
import EditorialRow from './EditorialRow';
import FeaturedRow from './FeaturedRow';
import InfoRow from './InfoRow';
import LatestRow from './LatestRow';
import PopularRow from './PopularRow';
import Fade from 'react-reveal/Fade';
import { getCachedObject, isObjectCached } from '../../utils/helpers';
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

    const getFeeds = async() => {
        dispatchFeed({ type: 'FETCH_FEED_INIT' });
        // Featured Feed
        let featured = await fetchFeatured();
        dispatchFeed({ type: 'FETCHED_FEATURED_FEED', payload: featured });
        // Editorial Feed
        let tips = isObjectCached('tips') ? getCachedObject('tips') : await fetchTips();
        dispatchFeed({ type: 'FETCHED_TIPS_FEED', payload: tips });
        // Info Feed
        let credit = isObjectCached('credit') ? getCachedObject('credit') : await fetchCredit();
        dispatchFeed({ type: 'FETCHED_CREDIT_FEED', payload: credit });
        // Latest Feed
        let reviews = isObjectCached('reviews') ? getCachedObject('reviews') : await fetchReviews();
        dispatchFeed({ type: 'FETCHED_REVIEW_FEED', payload: reviews });
        // Popular Feed
        let feed = isObjectCached('feed') ? getCachedObject('feed') : await fetchFeed();
        dispatchFeed({ type: 'FETCHED_FEED', payload: feed });
        await dispatchFeed({ type: 'FETCH_FEED_SUCCESS' });
    }

    useEffect(() => {
        if(componentIsMounted.current) {
            getFeeds();
        }
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, [])

    return (
        feedState.loadingFeed ? (<div>Loading</div>) : (
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