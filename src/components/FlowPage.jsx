import React from 'react';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';
import { FLOW_DATA } from '../utils/static';
import flag__left from '../assets/images/flag_left.png';
import flag__right from '../assets/images/flag_right.png';
import Breadcrumbs from '../components/Breadcrumbs';

const FlowPage = ({page, handleClick, showCrumbs = false}) => {
    const locals = FLOW_DATA[page];

    return (
        <div className='flow-content__container'>
            <img src={flag__left} alt='american-flag' className='flow-content__flag flag__left'/>
                <div className={`flow-content__choose-container ${showCrumbs ? 'with_crumbs' : ''}`}>
                    {showCrumbs && (<Breadcrumbs />)}
                    <span className='flow-title-text'>{locals.titleText}</span>
                    <FadeIn className='flow-button-container'>
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
                    </FadeIn>
                </div>
            <img src={flag__right} alt='american-flag' className='flow-content__flag flag__right'/>
        </div>
    );
}

export default FlowPage;