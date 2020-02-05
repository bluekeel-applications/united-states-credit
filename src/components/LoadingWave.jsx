import React, { useState } from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';
import animationData from '../assets/lotties/loading_wave.json';

const LoadingWave = () => {
	const [ windowWidth ] = useState(window.innerWidth);
	const [ windowHeight ] = useState(window.innerHeight / 2);
	
	const defaultOptions = {
		loop: true,
		autoplay: true, 
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: 'xMidYMid slice'
		}
	};
	
	return (    
		<FadeIn className='wave-loading-container'>
			<div className='wave-loading-message'>Gathering Personalized Offers...</div>
			<div className='wave-loading-message'>... please wait</div>
			<Lottie 
				className='lottie-loader'
				options={defaultOptions}
				height={windowHeight}
				width={windowWidth}
			/>
		</FadeIn>      
	);
}

export default LoadingWave;