import React from 'react';

const USCLayout = ({ children }) =>                              
    <div className='Home'>
        {children}
    </div>               


const OfferLayout = ({ children }) =>
    <div>
        <h2>Your Offers</h2>
        {children}
    </div>;

export { USCLayout, OfferLayout };