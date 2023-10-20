import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import { useLazyQuery } from '@apollo/client';
import FETCH_ARTICLE_BY_KEY from './utils/GraphQL/FETCH_ARTICLE_BY_KEY';
import { buildFullURL, setDefaultData } from './utils/helpers';
import Loading from '../../Shared/Loading';
import System1Page from './System1Page';
import System1Static from './System1Static';
import { useNavigate } from 'react-router-dom';

const System1 = () => {
    const history = useNavigate();
    const myURL = new URL(window.location.href);
    const { trackingState, dispatchApp } = useContext(AppContext);
    const [ showDynamicPage, setShowDynamicPage ] = useState(false);
    const [ pageReady, setPageReady ] = useState(false);
    const [ staticArticle, setStaticArticle ] = useState(trackingState.article);

    const showOldFormat = () => {
        console.log('Using Static style rsoc');
        window._rampJs();
        setShowDynamicPage(false);
        setPageReady(true);
    };

    const handleInboundData = (data) => {
        // If error getting article, use credit as default;
        if(!data?.fetchArticleByKey?.success){
            console.log('Error: No data found', data);
            const newURL = `/rsoc${setDefaultData(trackingState)}`;
            history.replace(newURL);
            setStaticArticle('credit');
            showOldFormat();
            return;
        };
        // Otherwise, set context and build full url
        dispatchApp({ type: 'SET_SYSTEM_1', payload: data.fetchArticleByKey.body });
        const tail = buildFullURL(data.fetchArticleByKey.body.buttons, trackingState);
        const newURL = `/rsoc${myURL.search}${tail}`;
        history.replace(newURL);
        window._rampJs();
        setShowDynamicPage(true);
        setPageReady(true);
    };

    const [fetchArticle, { called, loading, data }] = useLazyQuery(
        FETCH_ARTICLE_BY_KEY, { 
            variables: { key: trackingState.article },
            errorPolicy: 'ignore',
            onCompleted: handleInboundData
        }
    );


    useEffect(() => {
        if(called || pageReady) {
            return;
        };
        const hasButtonKeys = !!myURL.searchParams.get('forceKeyA');
        if(!hasButtonKeys) {
            fetchArticle();
        } else {
            showOldFormat();
        };
// eslint-disable-next-line
    },[data, pageReady]);

    if (loading || !pageReady) return <Loading/>;

    return (
        showDynamicPage ? 
        <System1Page /> :
        <System1Static article={staticArticle}/>
    );
};

export default System1;

//     const [ addLoadTime ] = useMutation(ADD_LOAD_TIME, { 
// 		onCompleted: (data) => console.log(data.addLoadTime.message) 
// 	});

//     const getIpData = async () => {
//         const res = await axios.get('https://api.ipify.org/?format=json');
//         setIP(res.data.ip);
//     };

//     const sendDelta = () => {
//         const diffTime = Math.abs(end.current - start.current);
//         addLoadTime({
//             variables: {
//                 user_ip: ip,
//                 delta: diffTime,
//                 subid: trackingState.subid,
//                 segment: trackingState.segment,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             }
//         });
//     };

//     useEffect(() => {
//         if(!ip) {
//             //passing getData method to the lifecycle method
//             getIpData();
//         }
//     }, [ip]);

//     useEffect(() => {
//         if(!!end.current && !!ip && !deltaSent.current) {
//             deltaSent.current = true;
//             sendDelta();
//         };
// // eslint-disable-next-line
//     },[end, ip]);