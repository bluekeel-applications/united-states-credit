import React, { useState, useEffect, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';
import { FLOW_DATA } from '../utils/static';

const FlowPage = ({page, handleClick}) => {
    const componentIsMounted = useRef(true);
    const [locals, setPageData] = useState(null);

    useEffect(() => {
        const setLocalPage = () => {
            if (componentIsMounted.current) {
                setPageData(FLOW_DATA[page]);
            };
        }
        setLocalPage();
        return () => {
            componentIsMounted.current = false
        };
        // eslint-disable-next-line
    }, []);

    return (
        locals && (
            <Fade big opposite>        
                <div className='choose-container'>
                    <span className='flow-title-text'>{locals.titleText}</span>
                    <div className='flow-button-container'>
                        {locals.buttons.map((button, i) => (
                            <Link 
                                key={`button__${button.value}__${i}`} 
                                to={'/'+ button.value} 
                                className='button-link' 
                                onClick={(e) => handleClick(e, button.value)}
                            >
                                <FlowButton icon={button.icon} text={button.text} color={button.color} />
                            </Link>
                        ))}                                            
                    </div>
                </div>
            </Fade>
        )
    );
}

export default FlowPage;