import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import { pageRoot } from '../theme';
import { LEGAL_CONTENT_VERSION } from '../loanPages';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import Toc from './Toc';

// "Effective / Last Updated: <date>" until a revision changes the document;
// from then on the two dates are stated apart.
const datesLine = ({ effectiveDate, lastUpdated }) => (lastUpdated
    ? `Effective: ${effectiveDate} · Last Updated: ${lastUpdated}`
    : `Effective / Last Updated: ${effectiveDate}`);

// Shared template for the legal/info pages: hero (breadcrumbs, h1, lede) +
// sticky TOC alongside the article of sections, each reachable by its id.
// Printed, the page is the document alone under a one-line header.
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
                <article className='legal-copy' style={Styles.legalCopy} data-legal-version={LEGAL_CONTENT_VERSION}>
                    {content.effectiveDate && (
                        <>
                            <span className='effective' style={Styles.effective}>{datesLine(content)}</span>
                            <div className='print-note' style={Styles.printNote}>UnitedStatesCredit.com — {h1} — {datesLine(content)}</div>
                        </>
                    )}
                    {content.intro}
                    {content.sections.map((section) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                            <h2 id={`${section.id}-title`} style={Styles.sectionH2}>{section.heading}</h2>
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
