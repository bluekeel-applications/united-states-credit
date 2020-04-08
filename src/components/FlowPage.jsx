import React from 'react';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';
import { FLOW_DATA } from '../utils/static';

const FlowPage = ({page, handleClick}) => {
    const locals = FLOW_DATA[page];

    return (
        <FadeIn className='choose-container'>
            <span className='flow-title-text'>{locals.titleText}</span>
            <div className='flow-button-container'>
                {locals.buttons.map((button, i) => (
                    <Link 
                        key={`button__${button.value}__${i}`} 
                        to={'/'+ button.value} 
                        className='button-link' 
                        onClick={(e) => handleClick(e, button.value, button.text)}
                    >
                        <FlowButton icon={button.icon} text={button.text} color={button.color} />
                    </Link>
                ))}                                            
            </div>
        </FadeIn>
    );
}

export default FlowPage;