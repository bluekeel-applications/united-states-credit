import { getCachedObject, isObjectCached, setCachedObject } from '../../utils/helpers';

const initialFeedState = {
    loadingFeed: true,
    featured: null,
    tips: isObjectCached('tips') ? getCachedObject('tips') : null,
    credit: isObjectCached('credit') ? getCachedObject('credit') : null,
    reviews: isObjectCached('reviews') ? getCachedObject('reviews') : null,
    feed: isObjectCached('feed') ? getCachedObject('feed') : null
};

const feedStateReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_FEED_INIT':
            return {
                ...state,
                loadingFeed: true
            };

        case 'FETCHED_FEATURED_FEED':
            const featuredObj = {
                title: action.payload.title,
                link: action.payload.link,
                categories: action.payload.categories,
                text: action.payload.contentSnippet,
                comments: action.payload.comments,
                snippet: action.payload.content
            }
            setCachedObject('featured', featuredObj);
            return {
                ...state,
                featured: featuredObj
            };

        case 'FETCHED_TIPS_FEED':
            setCachedObject('tips', action.payload);
            return {
                ...state,
                tips: action.payload
            };

        case 'FETCHED_CREDIT_FEED':
            setCachedObject('credit', action.payload);
            return {
                ...state,
                credit: action.payload
            };

        case 'FETCHED_REVIEW_FEED':
            setCachedObject('reviews', action.payload);
            return {
                ...state,
                reviews: action.payload
            };

        case 'FETCHED_FEED':
            setCachedObject('feed', action.payload);
            return {
                ...state,
                feed: action.payload
            };
             
        case 'FETCH_FEED_SUCCESS':
            return {
                ...state,
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