import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

const CELLS = [
    { title: 'Online Process', caption: 'Complete from anywhere' },
    { title: '$500–$25,000', caption: 'Amounts vary by provider' },
    { title: 'Multiple Factors', caption: 'Credit is not the only consideration' },
    { title: 'No Guarantee', caption: 'Approval is not assured' },
];

const TrustStrip = () => (
    <section className='trust' style={Styles.trust}>
        {CELLS.map((cell) => (
            <div key={cell.title} style={Styles.trustCell}>
                <strong style={Styles.trustStrong}>{cell.title}</strong>
                <span style={Styles.trustSpan}>{cell.caption}</span>
            </div>
        ))}
    </section>
);

export default Radium(TrustStrip);
