import React from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';
import animationData from '../assets/lotties/bubble.json';

const Loading = () => {
	
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
				width={200}
			/>
		</FadeIn>      
	);
}

export default Loading;