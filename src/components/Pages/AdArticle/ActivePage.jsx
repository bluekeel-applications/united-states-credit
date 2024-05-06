import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import styles from '../System1/System1.css.js';
import { useMediaQuery } from 'react-responsive';
import MainTitle from '../System1/Articles/components/MainTitle.jsx';
import { setPageComponent } from '../System1/utils/helpers';
import InArticleAd from './InArticleAd';

const ActivePage = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState, appState } = useContext(AppContext);
    const { header, sub_text } = appState.system1;
    const [ useArticle, setArticle ] = useState(null);

    useEffect(() => {
        setPageComponent(trackingState.article, setArticle);
    },[trackingState.article]);

    useEffect(() => {
        const facebookId = !!trackingState.fbid ? trackingState.fbid : '531202445442265';
        window.fbq('init', facebookId);
        // window.fbq('init', '1129397548111416');
        console.log('Initialized FB Pixel');
        // window.liQ = window.liQ || [];
        // window.liQ.push({
        //     "event": "viewContent",
        //     "name": "lead"
        // });
        // console.log('Initialized Live Intent Pixel');
        // eslint-disable-next-line
    },[]);

    const headerStyle = Object.assign({},
        styles.headerContainer,
        isMobile && styles.headerContainerMobile
    );
    const headerSubStyle = Object.assign({},
        styles.headerText,
        isMobile && styles.headerTextMobile
    );

    return(
        <div style={styles.mainContainer}>
            <div style={headerStyle}>
                {!!header && <MainTitle text={header} />}
                {!!sub_text && <div style={headerSubStyle}>{sub_text}</div>}
            </div>
            <InArticleAd />
            {useArticle}
        </div>
    );
};

export default ActivePage;