import React from 'react';
import Radium from 'radium';
import { useLocation } from 'react-router-dom';
import { pageRoot } from '../theme';
import useDocumentMeta from '../../../../utils/hooks/useDocumentMeta';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import HowItWorks from './HowItWorks';
import Notice from './Notice';
import Faq from './Faq';
import LegalCenterCta from './LegalCenterCta';
import { HOME_META } from '../loanPages';

// Landing page (reference home.html). ?mockform=1 forces the static form
// visualization instead of the vendor embed (used by snapshot verification).
// LegalCenterCta and the footer sit outside <main>, matching the reference.
const LoanLanding = () => {
    useDocumentMeta(HOME_META.documentTitle, HOME_META.metaDescription);
    const mockOnly = new URLSearchParams(useLocation().search).get('mockform') === '1';

    return (
        <div className='lw-page' style={pageRoot}>
            <SiteHeader variant='home' />
            <main id='main'>
                <Hero mockOnly={mockOnly} />
                <TrustStrip />
                <HowItWorks />
                <Notice />
                <Faq />
            </main>
            <LegalCenterCta />
            <SiteFooter />
        </div>
    );
};

export default Radium(LoanLanding);
