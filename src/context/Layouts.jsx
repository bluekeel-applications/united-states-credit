import React, { useContext, useRef, useEffect } from 'react';
import { AppContext } from './index';

const USCLayout = ({ children }) => {
    const componentIsMounted = useRef(true);
    const content = useRef(null);
    const { contentHeight, setContentHeight } = useContext(AppContext);

    useEffect(() => {
        if (componentIsMounted.current) {
            setContentHeight(content.current.scrollHeight);                               
        };     
        // Clean-up Function
        return () => {componentIsMounted.current = false};
        // eslint-disable-next-line
    }, [window.location.pathname]);

    return (
        <div 
        className='Home accordion__content' 
        style={{ minHeight: `${contentHeight}px` }}
        ref={content}
        >
            {children}
        </div>               
    )
}                           


const OfferLayout = ({ children }) =>
    <div>
        <h2>Your Offers</h2>
        {children}
    </div>;

export { USCLayout, OfferLayout };