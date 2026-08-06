import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

const STEPS = [
    { number: '1', title: 'Complete the form', copy: 'Provide the information requested through the lender-controlled secure form.' },
    { number: '2', title: 'Receive a response', copy: 'A participating provider may respond based on its own eligibility criteria.' },
    { number: '3', title: 'Review before accepting', copy: 'Compare APR, fees, payment schedule, and all provider disclosures.' },
];

const HowItWorks = () => (
    <section className='section' style={Styles.section}>
        <div className='container' style={Styles.container}>
            <div className='section-title center' style={Styles.sectionTitleCenter}>
                <div className='eyebrow' style={Styles.eyebrow}><span style={Styles.eyebrowBar} aria-hidden='true' />How it works</div>
                <h2 style={Styles.sectionTitleH2}>A straightforward way to explore options</h2>
            </div>
            <div className='cards' style={Styles.cards}>
                {STEPS.map((step) => (
                    <article key={step.number} className='card' style={Styles.card}>
                        <div className='number' style={Styles.cardNumber}>{step.number}</div>
                        <h3 style={Styles.cardH3}>{step.title}</h3>
                        <p style={Styles.cardP}>{step.copy}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Radium(HowItWorks);
