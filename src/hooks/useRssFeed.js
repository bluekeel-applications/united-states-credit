import { useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context';
import { 
    // fetchFeatured,
    fetchTips,
    fetchCredit,
    fetchReviews,
    fetchFeed
} from '../utils/feedTools';

const useRssFeed = () => {
    const componentIsMounted = useRef(true);
    const { feedState, dispatchFeed } = useContext(AppContext);
	const { tips, credit, reviews, feed } = feedState;

	// const getFeatured = async () => {
	// 	try{
	// 		const featuredData = !!featured ? featured : await fetchFeatured();
	// 		if(featuredData.status === 'failed') {
	// 			getFeatured();
	// 			return;
	// 		}
	// 		dispatchFeed({ type: 'FETCHED_FEATURED_FEED', payload: featuredData });
	// 		return;
	// 	} catch(err) {
	// 		console.warn(err);
	// 	};
	// };

	const getTips = async () => {
		try{
			const tipsData = !!tips ? tips : await fetchTips();
			if(tipsData.status === 'failed') {
				getTips();
				return;
			}
			dispatchFeed({ type: 'FETCHED_TIPS_FEED', payload: tipsData });
			return;
		} catch(err) {
			console.warn(err);
		};
	};

	const getCredit = async () => {
		try{
			const creditData = !!credit ? credit : await fetchCredit();
			if(creditData.status === 'failed') {
				getCredit();
				return;
			}
			dispatchFeed({ type: 'FETCHED_CREDIT_FEED', payload: creditData });
			return;
		} catch(err) {
			console.warn(err);
		};
	};

	const getReviews = async () => {
		try{
			const reviewsData = !!reviews ? reviews : await fetchReviews();
			if(reviewsData.status === 'failed') {
				getReviews();
				return;
			}
			dispatchFeed({ type: 'FETCHED_REVIEW_FEED', payload: reviewsData });
			return;
		} catch(err) {
			console.warn(err);
		};
	};

	const getFeed = async () => {
		try{
			const feedData = !!feed ? feed : await fetchFeed();
			if(feedData.status === 'failed') {
				getFeed();
				return;
			}
			dispatchFeed({ type: 'FETCHED_FEED', payload: feedData });
			return;
		} catch(err) {
			console.warn(err);
		};
	};
	
	const fetchFeeds = () => {
        // getFeatured();
        getTips();
        getCredit();        
        getReviews();        
        getFeed();
		
        // const featuredData = await getFeatured();
        // const tipsData = await getTips();
        // const creditData = await getCredit();        
        // const reviewsData = await getReviews();        
        // const feedData = await getFeed();
		// await Promise.all([featuredData, tipsData, creditData, reviewsData, feedData]);
	};

    useEffect(() => {
        if(componentIsMounted.current) { fetchFeeds(); }
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
	}, []);
};

export default useRssFeed;