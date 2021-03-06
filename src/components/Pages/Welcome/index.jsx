import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context';
import StartButton from '@bit/bluekeel.component-library.start-button';
import Radium from 'radium';
import styles from './Welcome.css.js';
import { useMediaQuery } from 'react-responsive';

const Welcome = () => {
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

    return (
		<div style={styles.welcomeContainer}>
            <span style={styles.titleText}>FIND THE RIGHT CREDIT FOR YOU!</span>
			<div style={styles.startButtonContainer}>
				<StartButton 
					showNav={showNavStart}
					theme='usc'
				/>
			</div>
		</div>
    );
}

export default Radium(Welcome);