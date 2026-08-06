import React from 'react';
import Radium from 'radium';
import RouteLink from './RouteLink';
import Styles from './LegalCenter.css';
import LayoutStyles from './LegalPageLayout.css';
import { pageRoot } from '../theme';
import useDocumentMeta from '../../../../utils/hooks/useDocumentMeta';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ReviewBanner from './ReviewBanner';
import { LEGAL_PAGES, LEGAL_CENTER_META, pathFor } from '../loanPages';
import useLoanTrack from '../useLoanTrack';

// The Legal Center hub — hero + "Important" banner + card grid linking every
// legal page, in registry order.
const LegalCenter = () => {
    useDocumentMeta(LEGAL_CENTER_META.documentTitle, LEGAL_CENTER_META.metaDescription);
    const track = useLoanTrack();

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
                        <ReviewBanner><strong>Important:</strong> UnitedStatesCredit.com is a marketing and referral service operated by BlueKeel LLC. It is not a lender and does not make credit decisions.</ReviewBanner>
                        <div className='legal-grid' style={Styles.legalGrid}>
                            {LEGAL_PAGES.map((page, index) => (
                                <RouteLink key={page.slug} className='legal-card' style={Styles.legalCard} to={pathFor(page.slug)} onClick={() => track('legal_card_clicked', { slug: page.slug, position: index + 1 })}>
                                    <small style={Styles.cardKicker}>{page.card.kicker}</small>
                                    <h2 style={Styles.cardTitle}>{page.card.title}</h2>
                                    <p style={Styles.cardBlurb}>{page.card.blurb}</p>
                                </RouteLink>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
};

export default Radium(LegalCenter);
