import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';
import LenderFormEmbed from './LenderFormEmbed';

// Hero: copy column + the lender form card. The {' '} between the h1 spans
// replaces .headline-lead:after{content:" "} — rendered when the spans are
// inline (>=760px), trimmed when they stack as blocks on mobile.
const Hero = ({ mockOnly }) => (
    <section className='hero' style={Styles.hero}>
        <div className='container hero-grid' style={Styles.heroGrid}>
            <div className='hero-copy' style={Styles.heroCopy}>
                <div className='eyebrow' style={Styles.eyebrow}><span style={Styles.eyebrowBar} aria-hidden='true' />Personal loan options</div>
                <h1 style={Styles.heroH1}><span className='headline-lead' style={Styles.headlineSpan}>Loans from</span>{' '}<span className='headline-amount' style={Styles.headlineSpan}>$500 to $25,000</span></h1>
                <p style={Styles.heroLede}>Complete one simple online form to see whether you may be connected with a participating provider.</p>
                <ul className='benefits' style={Styles.benefits}>
                    <li style={Styles.benefitsLi}><span className='check' style={Styles.check}>✓</span>Options for a range of credit profiles</li>
                    <li style={Styles.benefitsLi}><span className='check' style={Styles.check}>✓</span>One secure online form</li>
                    <li style={Styles.benefitsLi}><span className='check' style={Styles.check}>✓</span>No obligation to accept an offer</li>
                    <li className='desktop-benefit' style={Styles.benefitsLiDesktop}><span className='check' style={Styles.check}>✓</span>Fast responses from participating providers</li>
                </ul>
            </div>
            <LenderFormEmbed mockOnly={mockOnly} />
        </div>
    </section>
);

export default Radium(Hero);
