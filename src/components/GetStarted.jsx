import React from 'react';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';

const GetStarted = () => (
    <div className='content-container'>
        <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
        <Link to='/verticals' className='button-link'><FlowButton icon={['right', 'fal', 'arrow-alt-right']} text='Get Started' color='blue' /></Link>
    </div>
);


export default GetStarted;