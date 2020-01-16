import React from 'react';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';
import Zoom from 'react-reveal/Zoom';

const GetStarted = () => (
    <Zoom>
        <div className='content-container'>
            <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
            <Link to='/verticals' className='button-link'><FlowButton icon={['right', 'fal', 'arrow-alt-right']} text='Get Started' color='blue' /></Link>
        </div>
    </Zoom>
);


export default GetStarted;