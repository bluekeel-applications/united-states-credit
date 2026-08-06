import React, { useState } from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

const ITEMS = [
    { q: 'Can I submit a request with less-than-perfect credit?', a: 'Participating providers may consider consumers across a range of credit profiles and may evaluate factors beyond a traditional credit score. Each provider uses its own eligibility criteria, and approval is not guaranteed.' },
    { q: 'How much can I request?', a: 'The form may allow requests from $500 to $25,000. Any amount offered may differ from the amount requested and will depend on provider requirements, state availability, and applicant qualifications.' },
    { q: 'How quickly could funds be available?', a: 'Decision and funding times vary. Verification requirements, bank processing times, weekends, and holidays can affect when approved funds become available.' },
    { q: 'Will submitting the form affect my credit?', a: 'A participating provider may obtain a consumer report or use other information to evaluate a request. The live form and provider disclosures should explain the authorization and whether an inquiry may affect your credit profile before you submit.' },
    { q: 'Does submitting the form guarantee a loan?', a: 'No. Submitting information does not guarantee that you will be matched, approved, offered a particular amount, or funded.' },
    { q: 'What should I compare before accepting an offer?', a: 'Review the APR, finance charge, origination or other fees, payment amount, number of payments, total repayment amount, late-payment terms, and any prepayment conditions in the provider’s agreement.' },
];

// Native uncontrolled <details>; the +/− indicator span replaces the
// reference's summary:after pseudo-element ("−" is U+2212, matching the CSS
// content value byte-for-byte), flipped via the native toggle event.
const FaqItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <details style={Styles.details} onToggle={(event) => setOpen(event.currentTarget.open)}>
            <summary style={Styles.summary}>{q}<span style={Styles.summaryMark} aria-hidden='true'>{open ? '−' : '+'}</span></summary>
            <p style={Styles.detailsP}>{a}</p>
        </details>
    );
};

const Faq = () => (
    <section className='section' style={Styles.section}>
        <div className='container' style={Styles.container}>
            <div className='section-title center' style={Styles.sectionTitleCenter}>
                <div className='eyebrow' style={Styles.eyebrow}><span style={Styles.eyebrowBar} aria-hidden='true' />Questions</div>
                <h2 style={Styles.sectionTitleH2}>Personal loan FAQ</h2>
                <p style={Styles.sectionTitleP}>Clear answers about the request process, provider decisions, and what to review before accepting an offer.</p>
            </div>
            <div className='faq' style={Styles.faq}>
                {ITEMS.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
            </div>
        </div>
    </section>
);

export default Radium(Faq);
