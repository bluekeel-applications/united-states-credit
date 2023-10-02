import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import { useQuery } from '@apollo/client';
import FETCH_ARTICLE_BY_KEY from './utils/GraphQL/FETCH_ARTICLE_BY_KEY';
import Loading from '../../Shared/Loading';
import System1Page from './System1Page';
import { useHistory } from 'react-router-dom';

const System1 = () => {
    const history = useHistory();
    const myURL = new URL(window.location.href);
    const { trackingState, dispatchApp } = useContext(AppContext);
    const { loading, error, data } = useQuery(FETCH_ARTICLE_BY_KEY, { variables: { key: trackingState.article } });
    const [ showPage, setShowPage ] = useState(false);
    
    const buildKeyURL = (buttonArr) => {
        const keys = ['&forceKeyA=', '&forceKeyB=', '&forceKeyC=', '&forceKeyD=', '&forceKeyE=', '&forceKeyF=', '&forceKeyG=']
        const encodeArr = buttonArr.map((button) => {
          return button.trim().replace(/ /g,"+").replace("$","%24");
        });
        const keyArr = encodeArr.map((item, idx) => {
          return `${keys[idx]}${item}`;
        });
        return keyArr.join("");
    };

    useEffect(() => {
        if(!data || showPage) {
            return;
        };
        dispatchApp({ type: 'SET_SYSTEM_1', payload: data.fetchArticleByKey.body });
        const hasButtonKeys = !!myURL.searchParams.get('forceKeyA');
        if(!hasButtonKeys) {
            const tail = buildKeyURL(data.fetchArticleByKey.body.buttons);
            const newURL = `/rsoc${myURL.search}${tail}`;
            history.replace(newURL);
            window._rampJs();
            setShowPage(true);
        } else {
            console.log('setting rampjs without terms');
            window._rampJs();
            setShowPage(true);
        };
// eslint-disable-next-line
    },[data, showPage]);


    if (loading || !showPage) return <Loading/>;

    if (error) return <div>{`Error occured: ${error.message}`}</div>;

    return (
        showPage && <System1Page />
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