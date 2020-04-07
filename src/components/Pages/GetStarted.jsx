import React from 'react';
import { useHistory } from 'react-router-dom';
import FlowButton from '../FlowButton';

const GetStarted = () => {
    let history = useHistory();

    const handleStartClick = () => {
        history.push('/verticals');
    };

    return (
        <div className='content-container'>
            <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
            <FlowButton click={handleStartClick} icon={['right', 'fal', 'arrow-alt-right']} text='Get Started' color='blue' />
        </div>
    );
}


export default GetStarted;