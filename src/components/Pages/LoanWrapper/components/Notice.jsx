import React from 'react';
import Radium from 'radium';
import Styles from './LoanLanding.css';

const Notice = () => (
    <section className='section soft' style={Styles.sectionSoft}>
        <div className='container' style={Styles.container}>
            <div className='notice' style={Styles.notice}>
                <h3 style={Styles.noticeH3}>Know before you borrow</h3>
                <p style={Styles.noticeP}>United States Credit is not a lender and does not make credit decisions. Submitting information does not guarantee an offer, approval, or funding. Products, rates, fees, terms, and availability vary. Review the provider’s agreement carefully before accepting any loan.</p>
            </div>
        </div>
    </section>
);

export default Radium(Notice);
