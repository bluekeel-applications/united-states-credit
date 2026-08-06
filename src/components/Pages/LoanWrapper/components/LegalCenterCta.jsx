import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';
import RouteLink from './RouteLink';
import { pathFor } from '../loanPages';
import useLoanTrack from '../useLoanTrack';

// Sits OUTSIDE <main> in the reference — preserved by LoanLanding.
const LegalCenterCta = () => {
    const track = useLoanTrack();

    return (
    <section className='legal-center-cta' style={Styles.legalCenterCta} aria-labelledby='legal-center-heading'>
        <div className='container legal-center-cta-inner' style={Styles.legalCenterCtaInner}>
            <div>
                <h2 id='legal-center-heading' style={Styles.legalCenterCtaH2}>Legal Center</h2>
                <p style={Styles.legalCenterCtaP}>Review how United States Credit works, how information is handled, and the disclosures that apply before using our service.</p>
            </div>
            <RouteLink className='legal-center-button' style={Styles.legalCenterButton} to={pathFor('legal-center')} onClick={() => track('legal_center_cta_clicked')}>Visit the Legal Center&nbsp;→</RouteLink>
        </div>
    </section>
    );
};

export default Radium(LegalCenterCta);
