import React from 'react';
import Styles from './LegalPageLayout.css';

// Highlighted banner used by the Legal Center ("Important: ..."). The legal
// pages' "Implementation note" draft banners were removed by user decision.
const ReviewBanner = ({ children }) => (
    <div className='review-banner' style={Styles.reviewBanner}>
        {children}
    </div>
);

export default ReviewBanner;
