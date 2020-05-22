import React, { useState, useContext } from 'react';
import { AppContext } from '../../context';
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/loading_wave.json';
import { useHistory } from 'react-router-dom';
import usePchAPI from '../../hooks/usePchAPI';

const LoadingPCH = ({redirect}) => {
	usePchAPI();
	let history = useHistory();
	const [ windowWidth ] = useState(window.innerWidth);
	const [ windowHeight ] = useState(window.innerHeight - 100);
	const [ mobileWindowHeight ] = useState(window.innerHeight / 4);
	const { dispatchApp } = useContext(AppContext);
	const [mobile] = useState(window.innerWidth < 500);

	const defaultOptions = {
		loop: false,
		autoplay: true, 
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const handleAnimationCompleted = () => {
		dispatchApp({ type: 'ANIMATION_COMPLETED' });
		history.push(redirect);
	};
	
	return (
		mobile ? (
			<div className='pch-loading-container'>
				<div className='pch-loading-title pch-loading-message'>You could be on your way to financial freedom in no time!</div>
				<Lottie 
					className='lottie-loader'
					options={defaultOptions}
					height={mobileWindowHeight}
					width={windowWidth}
					eventListeners={[
						{
							eventName: 'complete',
							callback: () => handleAnimationCompleted(),
						}
					]}
				/>
				<div className='pch-loading-message'>Gathering your Personalized Offers...</div>
			</div>
		) : (
			<div className='pch-loading-container'>
				<div className='pch-loading-title pch-loading-message'>You could be on your way to financial freedom in no time!</div>
				<div className='pch-loading-message'>Gathering your Personalized Offers...</div>
				<Lottie 
					className='lottie-loader'
					options={defaultOptions}
					height={windowHeight}
					width={windowWidth}
					eventListeners={[
						{
							eventName: 'complete',
							callback: () => handleAnimationCompleted(),
						}
					]}
				/>
			</div>
		)
	);
}

export default LoadingPCH;