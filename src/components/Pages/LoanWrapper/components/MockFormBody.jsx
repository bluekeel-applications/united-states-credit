import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

// The reference's static form visualization, verbatim — shown while the
// vendor form loads (or permanently with ?mockform=1). The "thumb" div
// replaces the reference's .fake-range:after pseudo-element.
const MockFormBody = () => (
    <div className='mock-form' style={Styles.mockForm}>
        <div className='steps-mini' style={Styles.stepsMini}>
            <span style={Styles.stepsMiniSpanActive} />
            <span style={Styles.stepsMiniSpan} />
            <span style={Styles.stepsMiniSpan} />
            <span style={Styles.stepsMiniSpan} />
        </div>
        <div className='field-label' style={Styles.fieldLabel}>How much would you like to request?</div>
        <div className='amount-box' style={Styles.amountBox}>$5,000</div>
        <div className='fake-range' style={Styles.fakeRange}>
            <div style={Styles.fakeRangeThumb} aria-hidden='true' />
        </div>
        <div className='range-labels' style={Styles.rangeLabels}><span>$500</span><span>$35,000</span></div>
        <div className='field-label' style={Styles.fieldLabel}>What is the loan for?</div>
        <div className='fake-select' style={Styles.fakeSelect}><span>Select a purpose</span><span>⌄</span></div>
        <div className='primary-btn' style={Styles.primaryBtn}>Continue</div>
        <p className='consent-preview' style={Styles.consentPreview}>The live lender form will display required consent, data-sharing, contact, and consumer-report authorization language here before submission.</p>
    </div>
);

export default Radium(MockFormBody);
