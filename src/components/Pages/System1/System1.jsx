import React, { useEffect, useContext, useState, useRef } from 'react';
import { AppContext } from '../../../context';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FETCH_ARTICLE_BY_KEY } from '../../../utils/GraphQL/queries';
import { ADD_USER_EMAIL } from '../../../utils/GraphQL/mutations';
import { buildFullURL, setDefaultData, resetUrl } from './utils/helpers';
import Loading from '../../Shared/Loading';
import System1Page from './System1Page';
import System1Static from './System1Static';
import OfferBlockPage from './OfferBlockPage';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const System1 = () => {
    const navigate = useNavigate();
    const emailSent = useRef(false);
    const myURL = new URL(window.location.href);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState, dispatchApp, appState } = useContext(AppContext);
    const [ pageType, setPageType ] = useState(null);
    const [ pageReady, setPageReady ] = useState(false);
    const [ staticArticle, setStaticArticle ] = useState(trackingState.article);

    // Since there is no "end" click, post email to mongo for use later with search_track url param
    const [ addUserEmail ] = useMutation(ADD_USER_EMAIL, { 
        onCompleted: (data) => {
            const submittedEmail = data.addUserEmail.body.email
            console.log('Email posted to Mongo:', submittedEmail);
        }
    });

    const postEmailToMongo = () => {
        const sendEmail = trackingState['email'] === '' ? 'missing' : trackingState['email'];
        console.log('Sending email to Mongo:', sendEmail);
        addUserEmail({
            variables: {
                clickId: Number(trackingState['hsid']),
                email: sendEmail
            }
        });
    };
    
    useEffect(() => {
        if(!emailSent.current) {
            postEmailToMongo();
            emailSent.current = true;
        };
        // eslint-disable-next-line
    },[emailSent.current]);

    const showOldFormat = () => {
        console.log('Using Static style rsoc');
        window._rampJs();
        setPageType('static');
        setPageReady(true);
    };

    const handleInboundData = (data) => {
        // If error getting article, use credit as default;
        if(!data?.fetchArticleByKey?.success){
            console.log('Error: No data found', data);
            const newURL = `/rsoc?${setDefaultData(trackingState, appState.uri)}`;
            navigate(newURL, { replace: true });
            setStaticArticle('credit');
            showOldFormat();
            return;
        };
        // Otherwise, set context and build full url
        dispatchApp({ type: 'SET_SYSTEM_1', payload: data.fetchArticleByKey.body });
        const tail = buildFullURL(data.fetchArticleByKey.body.buttons, trackingState, appState.uri);
        // const newURL = `/rsoc${myURL.search}${tail}`;
        const newURL = `/rsoc?${tail}`;
        navigate(newURL, { replace: true });
        // If set RSOC desktop is true and its not mobile now send to RSOC
        if(data.fetchArticleByKey.body.rsoc_desktop && !isMobile) {
            window._rampJs();
            setPageType('dynamic');
            setPageReady(true);
            return;
        };
        // If the dsiplay is set to Block and the article has associated offer block set
        if(trackingState.display === 'block' && !!data.fetchArticleByKey.body.offer_block) {
            // Show Offer Block
            setPageType('block');
            setPageReady(true);
            return;
        } else {
            // For rsoc dynamic page
            window._rampJs();
            setPageType('dynamic');
            setPageReady(true);
        };
    };

    const [fetchArticle, { called, loading, data }] = useLazyQuery(
        FETCH_ARTICLE_BY_KEY, { 
            variables: { key: trackingState.article },
            errorPolicy: 'ignore',
            onCompleted: handleInboundData
        }
    );

    const handleRefresh = () => {
        const newURL = `${window.location.origin}/rsoc?${resetUrl(trackingState)}`;
        window.location.href = newURL;
    };

    useEffect(() => {
        if(called || pageReady) {
            return;
        };
        const hasButtonKeys = !!myURL.searchParams.get('forceKeyA');
        const isRefresh = !!myURL.searchParams.get('fired');
        //Handle a refresh event
        if(hasButtonKeys && isRefresh) {
            handleRefresh();
            return;
        };

        if(hasButtonKeys && !isRefresh) {
            showOldFormat();
            return;
        };

        if(!hasButtonKeys) {
            fetchArticle();
            return;
        };

// eslint-disable-next-line
    },[data, pageReady]);

    if (loading || !pageReady) return <Loading/>;

    const renderSwitch = (page) => {
        switch(page) {
            case 'dynamic':
                return <System1Page />;
            case 'static':
                return <System1Static article={staticArticle}/>;
            case 'block':
                return <OfferBlockPage />;
            default:
                return <System1Page />;
        };
    };
    return renderSwitch(pageType);
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