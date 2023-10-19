import React, { useState, memo } from 'react';
import Lottie from 'react-lottie';
import animationData from './loading_wave.json';
import { useMediaQuery } from 'react-responsive';
import styles from './LoadingRedirect.css.js';
import Radium from 'radium';

const LoadingRedirect = Radium(({ setComplete }) => {
	const [ windowWidth ] = useState(window.innerWidth);
	const [ windowHeight ] = useState(window.innerHeight - 100);
	const [ mobileWindowHeight ] = useState(window.innerHeight / 4);

	const isMobile = useMediaQuery({ maxWidth: 767 });

	const defaultOptions = {
		loop: false,
		autoplay: true, 
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	
	return (
        <div style={styles.container}>
            <div style={styles.title}>
                You could be on your way to financial freedom in no time!
            </div>
            {!isMobile && (
                <div key='loader-message-desktop' style={styles.message}>
                    Gathering your Personalized Offers...
                </div>
            )}
            <Lottie 
                style={styles.lottie}
                options={defaultOptions}
                height={isMobile ? mobileWindowHeight : windowHeight}
                width={windowWidth}
                eventListeners={[
                    {
                        eventName: 'complete',
                        callback: setComplete,
                    }
                ]}
            />
            {isMobile && (
                <div key='loader-message-mobile' style={styles.message}>
                    Gathering your Personalized Offers...
                </div>
            )}
        </div>
	);
})

export default memo(LoadingRedirect);