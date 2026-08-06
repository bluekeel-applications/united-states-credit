import React from 'react';
import Styles from './LegalPageLayout.css';

// Draft-review marker kept verbatim from the reference (user decision).
// Defaults to the shared "Implementation note" used by all 8 legal pages;
// Legal Center passes its own "Important:" variant as children.
const ReviewBanner = ({ children }) => (
    <div className='review-banner' style={Styles.reviewBanner}>
        {children ?? <><strong>Implementation note:</strong> This draft should be reviewed against the final lender integration, partner agreements, data flow, consent language, state availability, and applicable law before publication.</>}
    </div>
);

export default ReviewBanner;
