import React from 'react';
import Styles from './LegalPageLayout.css';

// Highlighted banner used by the Legal Center ("Transparency matters. ...").
const ReviewBanner = ({ children }) => (
    <div className='review-banner' style={Styles.reviewBanner}>
        {children}
    </div>
);

export default ReviewBanner;
