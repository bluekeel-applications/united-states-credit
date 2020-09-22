import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import StartButton from '@bit/bluekeel.component-library.start-button';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import styles from './StyleOverrides.css.js';
import Radium from 'radium';

const GetStarted = () => {
    let history = useHistory();
    const { appState } = useContext(AppContext);

    const handleStartClick = () => {
        history.push('/verticals');
        window.scrollTo(0, 0);
    };
    
    return (
        <ContentWrapper theme='uscStart'>
            <span style={styles.welcomeText}>FIND THE RIGHT CREDIT FOR YOU!</span>
            <StartButton 
                showNav={appState.showNavStart}
                colorScheme='usc'
                handleClick={handleStartClick}
            />
        </ContentWrapper>
    );
};


export default Radium(GetStarted);