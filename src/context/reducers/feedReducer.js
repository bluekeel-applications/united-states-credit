import { getCachedObject, isObjectCached, setCachedObject } from '../../utils/helpers';

const initialFeedState = {
    loadingFeatured: true,
    loadingTips: true,
    loadingCredit: true,
    loadingReviews: true,
    loadingFeed: true,
    featured: null,
    tips: isObjectCached('tips') ? getCachedObject('tips') : null,
    credit: isObjectCached('credit') ? getCachedObject('credit') : null,
    reviews: isObjectCached('reviews') ? getCachedObject('reviews') : null,
    feed: isObjectCached('feed') ? getCachedObject('feed') : null
};

const feedStateReducer = (state, action) => {
    switch (action.type) {        

        case 'FETCHED_FEATURED_FEED':
            const featuredObj = action.payload.map((feature) => ({
                    title: feature.title,
                    link: feature.link,
                    categories: feature.categories,
                    text: feature.contentSnippet,
                    comments: feature.comments,
                    snippet: feature.content
                }
            ))            
            return {
                ...state,
                featured: featuredObj,
                loadingFeatured: false,
            };

        case 'FETCHED_TIPS_FEED':
            setCachedObject('tips', action.payload);
            return {
                ...state,
                tips: action.payload,
                loadingTips: false,
            };

        case 'FETCHED_CREDIT_FEED':
            setCachedObject('credit', action.payload);
            return {
                ...state,
                credit: action.payload,
                loadingCredit: false,
            };

        case 'FETCHED_REVIEW_FEED':
            setCachedObject('reviews', action.payload);
            return {
                ...state,
                reviews: action.payload,
                loadingReviews: false,
            };

        case 'FETCHED_FEED':
            setCachedObject('feed', action.payload);
            return {
                ...state,
                feed: action.payload,
                loadingFeed: false
            };       

        case 'RESET':
            return initialFeedState;        

        default:
            throw new Error(`Not supported action ${action.type}`);
    }
};

export {
    initialFeedState,
    feedStateReducer
};