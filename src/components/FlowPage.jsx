import React, { useState, useEffect, useRef } from 'react';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-router-dom';
import FlowButton from './FlowButton';
import { FLOW_DATA } from '../utils/static';

const FlowPage = ({page, handleClick}) => {
    const componentIsMounted = useRef(true);
    const content = useRef(null);
    const [locals, setPageData] = useState(null);
    const [setHeight, setHeightState] = useState('0px');

    useEffect(() => {
        const setLocalPage = () => {
            if (componentIsMounted.current) {
                setPageData(FLOW_DATA[page]);
                setTimeout(() => {
                    setHeightState(`${content.current.scrollHeight}px`);
                }, 350);                
            };
        }
        setLocalPage();
        return () => {
            setHeightState('0px');
            componentIsMounted.current = false
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div 
            ref={content}
            style={{ maxHeight: `${setHeight}` }}
            className='accordion__content'
        >
        {locals && (
                <Zoom>        
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
                </Zoom>                
        )}
        </div>
    );
}

export default FlowPage;