import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './LegalCenter.css';
import ReviewBanner from './ReviewBanner';
import { LEGAL_PAGES, pathFor } from '../loanPages';
import useLoanTrack from '../useLoanTrack';

// The hub's body — the "Transparency matters." banner and the card grid
// linking every legal page, in registry order — as one component, so the
// Legal Center page (LegalCenter) and the compliance snapshot
// (scripts/compliance-snapshot) render the same words and the same cards.
// Banner copy is the legal package's index.html.
const LegalCenterBody = () => {
    const track = useLoanTrack();

    return (
        <>
            <ReviewBanner><strong>Transparency matters.</strong> UnitedStatesCredit is a loan-matching and financial-information service, not a lender. Review the documents below to understand how the service works and how information is handled. Some legally required permissions are presented separately at the point where information is collected.</ReviewBanner>
            <div className='legal-grid' style={Styles.legalGrid}>
                {LEGAL_PAGES.map((page, index) => (
                    <RouteLink key={page.slug} className='legal-card' style={Styles.legalCard} to={pathFor(page.slug)} onClick={() => track('legal_card_clicked', { slug: page.slug, position: index + 1 })}>
                        <small style={Styles.cardKicker}>{page.card.kicker}</small>
                        <h2 style={Styles.cardTitle}>{page.card.title}</h2>
                        <p style={Styles.cardBlurb}>{page.card.blurb}</p>
                    </RouteLink>
                ))}
            </div>
        </>
    );
};

export default Radium(LegalCenterBody);
