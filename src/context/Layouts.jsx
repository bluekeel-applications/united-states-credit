import React from 'react';

const FlowLayout = ({ children }) =>
    <div className='Home'>
        {children}
    </div>;

const OfferLayout = ({ children }) =>
    <div>
        <h2>Your Offers</h2>
        {children}
    </div>;

export { FlowLayout, OfferLayout };