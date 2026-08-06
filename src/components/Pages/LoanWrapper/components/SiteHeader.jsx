import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './SiteHeader.css';
import lwLogo from '../../../../assets/Images/usc_lw_logo.png';
import { LOANS_HOME, pathFor } from '../loanPages';

// Header chrome shared by every /loans page. variant='home' shows the SSL
// security badge (landing page); variant='legal' shows the Legal Center link.
const SiteHeader = ({ variant = 'legal' }) => (
    <>
        <a className='skip' href='#main' style={Styles.skip}>Skip to content</a>
        <header className='site-header' style={Styles.siteHeader}>
            <div className='header-inner' style={Styles.headerInner}>
                <RouteLink to={LOANS_HOME}>
                    <img className='logo' style={Styles.logo} src={lwLogo} alt='United States Credit' />
                </RouteLink>
                {variant === 'home' ? (
                    <div className='security-badge' style={Styles.securityBadge} aria-label='Your data is protected with 256-bit SSL encryption'>
                        <span className='security-icon' style={Styles.securityIcon} aria-hidden='true'>
                            <svg viewBox='0 0 24 24' fill='none' style={Styles.securityIconSvg}>
                                <path d='M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                                <rect x='5' y='10' width='14' height='11' rx='3' stroke='currentColor' strokeWidth='2' />
                                <path d='M12 14.5v2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                            </svg>
                        </span>
                        <span className='security-copy' style={Styles.securityCopy}>
                            <strong style={Styles.securityCopyStrong}>256-bit SSL</strong>
                            <span style={Styles.securityCopySpan}>Encrypted data</span>
                        </span>
                    </div>
                ) : (
                    <RouteLink className='header-link' style={Styles.headerLink} to={pathFor('legal-center')}>Legal Center</RouteLink>
                )}
            </div>
        </header>
    </>
);

export default Radium(SiteHeader);
