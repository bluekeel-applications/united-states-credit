import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import { pageRoot } from '../theme';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import Toc from './Toc';

// Shared template for the legal/info pages: hero (breadcrumbs, h1, lede) +
// sticky TOC alongside the article of #s1..#sN sections. The reference's
// closing "Implementation note" draft banner is intentionally omitted
// (user decision, 2026-08-06).
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
                <article className='legal-copy' style={Styles.legalCopy}>
                    {content.effectiveDate && (
                        <span className='effective' style={Styles.effective}>Effective: {content.effectiveDate}</span>
                    )}
                    {content.intro}
                    {content.sections.map((section) => (
                        <section key={section.id} id={section.id}>
                            <h2 style={Styles.sectionH2}>{section.heading}</h2>
                            {section.body}
                        </section>
                    ))}
                </article>
            </div>
        </main>
        <SiteFooter />
    </div>
);

export default Radium(LegalPageLayout);
