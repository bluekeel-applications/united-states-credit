import React from 'react';
import Radium from 'radium';
import Styles from './LegalCenter.css';
import LayoutStyles from './LegalPageLayout.css';
import { pageRoot } from '../theme';
import useDocumentMeta from '../../../../utils/hooks/useDocumentMeta';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import LegalCenterBody from './LegalCenterBody';
import { LEGAL_CENTER_META } from '../loanPages';

// The Legal Center hub — hero + the body (LegalCenterBody: the "Transparency
// matters." banner and the card grid linking every legal page, in registry
// order). Hero copy is the legal package's index.html.
const LegalCenter = () => {
    useDocumentMeta(LEGAL_CENTER_META.documentTitle, LEGAL_CENTER_META.metaDescription);

    return (
        <div className='lw-page' style={pageRoot}>
            <SiteHeader variant='legal' />
            <main id='main'>
                <section className='legal-hero' style={LayoutStyles.legalHero}>
                    <div className='container' style={LayoutStyles.container}>
                        <Breadcrumbs />
                        <h1 style={LayoutStyles.heroH1}>{LEGAL_CENTER_META.h1}</h1>
                        <p style={LayoutStyles.heroLede}>{LEGAL_CENTER_META.lede}</p>
                    </div>
                </section>
                <section className='section' style={Styles.section}>
                    <div className='container' style={Styles.container}>
                        <LegalCenterBody />
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
};

export default Radium(LegalCenter);
