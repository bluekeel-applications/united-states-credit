import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './SiteFooter.css';
import lwLogoReversed from '../../../../assets/Images/usc_lw_logo_reversed.png';
import { pathFor, footerColumn, CONTACT_EMAIL } from '../loanPages';

// Footer chrome shared by every /loans page — byte-identical across all
// reference pages. Both nav columns derive from the loanPages registry.
const SiteFooter = () => (
    <footer className='site-footer' style={Styles.siteFooter}>
        <div className='container' style={Styles.container}>
            <div className='footer-grid' style={Styles.footerGrid}>
                <div className='footer-brand'>
                    <img style={Styles.brandImg} src={lwLogoReversed} alt='United States Credit' />
                    <p style={Styles.brandCopy}>UnitedStatesCredit.com is operated by BlueKeel LLC. We are not a lender and do not make credit decisions. We may receive compensation when consumers are connected with participating providers.</p>
                </div>
                <div className='footer-col'>
                    <h3 style={Styles.colHeading}>Legal Center</h3>
                    <nav className='footer-links' style={Styles.footerLinks}>
                        <RouteLink key='legal-center' style={Styles.footerLink} to={pathFor('legal-center')}>Legal Center</RouteLink>
                        {footerColumn('legal').map((page) => (
                            <RouteLink key={page.slug} style={Styles.footerLink} to={pathFor(page.slug)}>{page.footer.label}</RouteLink>
                        ))}
                    </nav>
                </div>
                <div className='footer-col'>
                    <h3 style={Styles.colHeading}>Transparency</h3>
                    <nav className='footer-links' style={Styles.footerLinks}>
                        {footerColumn('transparency').map((page) => (
                            <RouteLink key={page.slug} style={Styles.footerLink} to={pathFor(page.slug)}>{page.footer.label}</RouteLink>
                        ))}
                        <a key='contact' style={Styles.footerLink} href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
                    </nav>
                </div>
            </div>
            <div className='footer-bottom' style={Styles.footerBottom}>© 2026 BlueKeel LLC. All rights reserved. United States Credit is a marketing and referral service, not a lender, creditor, broker, bank, or financial advisor. Availability and terms vary by provider, applicant qualifications, and state law.</div>
        </div>
    </footer>
);

export default Radium(SiteFooter);
