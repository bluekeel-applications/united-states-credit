import React from 'react';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';

const GetStarted = () => (
    <div className='get-started-container'>
        <span className='start-title-text'>FIND THE RIGHT CREDIT FOR YOU</span>
        <Link to='/verticals'><FlowButton icon={['right', 'fal', 'arrow-alt-right']} text='Get Started' color='blue' /></Link>
        <div className='get-started-info-container'>
            Credit, now more than ever, has become the financial lifeblood of the American consumer. At United States Credit we know and understand the importance and impacts credit can have. We also know and understand the frustrations involved in the credit approval process. United States Credit provides a wealth of knowledge at your fingertips written in a way that the credit laymen can understand. Find the right loan, find the right credit card and find the right knowledge. When your ready, answer a few quick questions and our visual credit search can help to simplify the process and remove the frustration in finding the right credit for you!
        </div>
    </div>
);


export default GetStarted;