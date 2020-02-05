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
		<FadeIn>
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