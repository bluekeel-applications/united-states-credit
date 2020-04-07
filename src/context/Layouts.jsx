import React, { useRef } from 'react';

const USCLayout = ({ children }) => {
    const content = useRef(null);
    return (
        <div 
        className='Home accordion__content bottom-border' 
        // style={{ minHeight: `${contentHeight}px` }}
        style={{ minHeight: 'fit-content' }}
        ref={content}
        >
            {children}
        </div>               
    )
};                


const OfferLayout = ({ children }) =>
    <div>
        <h2>Your Offers</h2>
        {children}
    </div>;

export { USCLayout, OfferLayout };