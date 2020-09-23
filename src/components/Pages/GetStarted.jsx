import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import StartButton from '@bit/bluekeel.component-library.start-button';
import ContentWrapper from '@bit/bluekeel.component-library.content-wrapper';
import styles from './StyleOverrides.css.js';
import Radium from 'radium';

const GetStarted = () => {
    let history = useHistory();
    const { dispatchApp } = useContext(AppContext);
    const [ scrollTop, setScrollTop ] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 767 });
	const [ showNavStart, toggleShowNavStart ] = useState(isMobile && scrollTop > 200);
    
    useEffect(() => {
		const onScroll = e => {
			setScrollTop(e.target.documentElement.scrollTop);
		};
		window.addEventListener('scroll', onScroll);
		
        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line
	}, [scrollTop]);

	useEffect(() => {
        if (isMobile && scrollTop > 200) {
			dispatchApp({ type: 'SHOW_FULL_LOGO', payload: false });
            return;
        };

		return () => dispatchApp({ type: 'SHOW_FULL_LOGO', payload: true });;
		// eslint-disable-next-line
	}, [scrollTop, isMobile]);
	
	useEffect(() => {
		if (scrollTop <= 100) {
			toggleShowNavStart(false);
			return;
		};

		if (scrollTop > 200) {
			toggleShowNavStart(true);
			return;
		};

		return () => toggleShowNavStart(false);
		
	}, [scrollTop]);
    const handleStartClick = () => {
        history.push('/verticals');
        window.scrollTo(0, 0);
    };
    
    return (
        <ContentWrapper theme='uscStart' isEnd={false}>
            <span style={styles.welcomeText}>FIND THE RIGHT CREDIT FOR YOU!</span>
            <StartButton 
                showNav={showNavStart}
                theme='usc'
                handleClick={handleStartClick}
            />
        </ContentWrapper>
    );
};


export default Radium(GetStarted);