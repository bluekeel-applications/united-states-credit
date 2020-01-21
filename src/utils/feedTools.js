import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

let parser = new Parser();

export const fetchFeatured = async() => {
    try{
        const rawRes = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/category/featured/feed/');
        return rawRes.items[0];
    } catch(err) {
        console.warn('Unable to fetch feed data:', err)
        return
    }
};

export const fetchTips = async() => {
    try{
        const rawResTips = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/category/credit-tips/feed/');
        return rawResTips.items;
    } catch(err) {
        console.warn('Unable to fetch feed data:', err)
        return
    }
};

export const fetchCredit = async() => {
    try{
        const rawResCredit = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/category/find-credit/feed/');
        return rawResCredit.items;
    } catch(err) {
        console.warn('Unable to fetch feed data:', err)
        return
    }
};
export const fetchReviews = async() => {
    try{
        const rawResReviews = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/category/reviews/feed/');
        return rawResReviews.items;
    } catch(err) {
        console.warn('Unable to fetch feed data:', err)
        return
    }
};
export const fetchFeed = async() => {
    try{
        const rawRes = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/feed/');
        return rawRes.items;
    } catch(err) {
        console.warn('Unable to fetch feed data:', err)
        return
    }
};

export const getSrcFromHtml = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    let htmlObject = tempDiv.firstChild;
    return htmlObject.getAttribute('src');
};

export const trimSnippet = (snippet) => {
    let res = snippet.split('Continue reading');
    return res[0];
};