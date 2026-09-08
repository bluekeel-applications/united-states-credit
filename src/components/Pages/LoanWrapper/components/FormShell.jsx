import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

// The hero form card's chrome — brand rule, navy heading — around whichever
// form body the caller renders: the third-party embed, bkform, or the static
// mock. `clip` swaps overflow:hidden for overflow:clip: the same rounded-corner
// clipping, but no scroll container, which is what lets bkform's sticky
// Continue bar stick to the viewport on a phone instead of to this card.
const FormShell = ({ showMock = false, clip = false, children }) => (
    <section
        className='form-shell'
        style={clip ? Styles.formShellClip : Styles.formShell}
        aria-label={showMock ? 'Static form visualization' : 'Loan request form'}
    >
        <div className='brand-rule' style={Styles.brandRule} />
        <div className='form-head' style={Styles.formHead}>
            <h2 style={Styles.formHeadH2}>See your available options</h2>
            {showMock && <p style={Styles.formHeadP}>Static preview of the lender-controlled form area</p>}
        </div>
        {children}
        {showMock && <div className='form-note' style={Styles.formNote}>Visualization only — no external script or data collection is active on this preview.</div>}
    </section>
);

export default Radium(FormShell);
