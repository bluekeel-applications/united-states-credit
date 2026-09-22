import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import { pageRoot } from '../theme';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import Toc from './Toc';
import LegalArticle from './LegalArticle';

// Shared template for the legal/info pages: hero (breadcrumbs, h1, lede) +
// sticky TOC alongside the article of sections (LegalArticle), each reachable
// by its id. Printed, the page is the document alone under a one-line header.
const LegalPageLayout = ({ h1, lede, content }) => (
    <div className='lw-page' style={pageRoot}>
        <SiteHeader variant='legal' />
        <main id='main'>
            <section className='legal-hero' style={Styles.legalHero}>
                <div className='container' style={Styles.container}>
                    <Breadcrumbs current={h1} />
                    <h1 style={Styles.heroH1}>{h1}</h1>
                    <p style={Styles.heroLede}>{lede}</p>
                </div>
            </section>
            <div className='container legal-layout' style={Styles.legalLayout}>
                <Toc sections={content.sections} />
                <LegalArticle h1={h1} content={content} />
            </div>
        </main>
        <SiteFooter />
    </div>
);

export default Radium(LegalPageLayout);
