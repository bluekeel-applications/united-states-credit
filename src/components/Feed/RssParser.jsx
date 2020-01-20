import { useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context';

import Parser from 'rss-parser';

const RssParser = () => {
    const componentIsMounted = useRef(true);
    const { CORS_PROXY } = useContext(AppContext);
    let parser = new Parser();

    const getFeed = async() => {
        let feed = await parser.parseURL(CORS_PROXY + 'https://unitedstatescredit.blog/feed');
        console.log('feed:', feed);
        // feed.items.forEach(item => {
        //     console.log(item.title + ':' + item.link)
        //   });
    };

    useEffect(() => {
        if (componentIsMounted.current) {
            getFeed();                               
        };     
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, []);

    return null
};

export default RssParser;