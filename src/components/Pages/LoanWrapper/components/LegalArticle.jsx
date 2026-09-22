import React from 'react';
import Radium from 'radium';
import Styles from './LegalPageLayout.css';
import { LEGAL_CONTENT_VERSION } from '../loanPages';

// "Effective / Last Updated: <date>" until a revision changes the document;
// from then on the two dates are stated apart.
export const datesLine = ({ effectiveDate, lastUpdated }) => (lastUpdated
    ? `Effective: ${effectiveDate} · Last Updated: ${lastUpdated}`
    : `Effective / Last Updated: ${effectiveDate}`);

// The document itself — the dates pill, the intro, the sections each reachable
// by its id — as one component, so the legal page (LegalPageLayout) and the
// compliance snapshot (scripts/compliance-snapshot) render the very same
// article from the same content module. Radium-wrapped for the print and
// mobile keys on its own styles.
const LegalArticle = ({ h1, content }) => (
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
);

export default Radium(LegalArticle);
