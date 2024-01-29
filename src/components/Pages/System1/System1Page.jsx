import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../../context';
import styles from './System1.css';
import { useMediaQuery } from 'react-responsive';
import ButtonContainer from './ButtonContainer';
import MainTitle from './MainTitle';
import { setPageComponent } from './utils/helpers';

const System1Page = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { trackingState, appState } = useContext(AppContext);
    const { header, sub_text, button_title } = appState.system1;
    const [ useArticle, setArticle ] = useState(null);

    useEffect(() => {
        setPageComponent(trackingState.article, setArticle);
    },[trackingState.article]);

    useEffect(() => {
        window.fbq('init', '531202445442265');
        console.log('Initialized FB Pixel');
        window.liQ = window.liQ || [];
        window.liQ.push({
            "event": "viewContent",
            "name": "lead"
        });
        console.log('Initialized Live Intent Pixel');
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
            <ButtonContainer 
                containerId='rampjs_slot1' 
                email={trackingState['email']} 
                title={button_title}
            />
            {useArticle}
        </div>
    );
};

export default System1Page;