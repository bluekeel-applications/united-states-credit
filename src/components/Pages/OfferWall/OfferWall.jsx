import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Radium from 'radium';
import { AppContext } from '../../../context';
import useClickSubmit from '../../../utils/hooks/useClickSubmit';
import useOffersByCategories from '../../../utils/hooks/useOffersByCategories';
import useCoRegPathValues from '../../../utils/hooks/useCoRegPathValues';
import useOtherOpportunities from '../../../utils/hooks/useOtherOpportunities';
import buildLinkout from '../../../utils/buildLinkout';
import trackOfferEvent from '../../../utils/trackOfferEvent';
import Loading from '../../Shared/Loading';
import styles from './OfferWall.module.css';
import logo from '../../../assets/Images/usc_full_logo.png';
import CategoryNav from './components/CategoryNav';
import CategorySection from './components/CategorySection';
import CrossSell from './components/CrossSell';
import RedirectModal from './components/RedirectModal';
import {
    CATEGORY_KEYS,
    CATEGORY_MAP,
    parseCategories,
} from '../Offers/offerConfig';

// Page 2 — Offer Wall. Renders only the category sections the visitor selected
// on Page 1 (via ?categories=), each with top-3 + Show More, plus a bottom
// cross-sell. Offer data comes from offerConfig (Phase 1); live data is Phase 3.
const OfferWall = () => {
    const [ searchParams ] = useSearchParams();
    const { trackingState } = useContext(AppContext);
    const [ sticky, setSticky ] = useState(false);
    const [ showBookmarkHint, setShowBookmarkHint ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ shouldExecute, setExecute ] = useState(false);
    const inlineNavRef = useRef(null);
    const bookmarkTimer = useRef(null);
    const redirectTimer = useRef(null);

    // Fires the pixel + Mongo pipeline once when the first offer is clicked
    // (mirrors System1's ButtonGroupPage behavior).
    useClickSubmit(trackingState, trackingState.email, shouldExecute);

    // Browsers expose no API to add a bookmark, so clicking the pill just tells
    // the user the keyboard shortcut for their platform (⌘+D Mac / Ctrl+D else).
    const isMac = /Mac|iPhone|iPad|iPod/.test(
        (typeof navigator !== 'undefined' && (navigator.platform || navigator.userAgent)) || ''
    );
    const bookmarkKeys = isMac ? '⌘ + D' : 'Ctrl + D';

    const handleBookmarkClick = () => {
        setShowBookmarkHint(true);
        clearTimeout(bookmarkTimer.current);
        bookmarkTimer.current = setTimeout(() => setShowBookmarkHint(false), 4000);
    };

    useEffect(() => {
        if (!showBookmarkHint) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setShowBookmarkHint(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showBookmarkHint]);

    useEffect(() => () => clearTimeout(bookmarkTimer.current), []);

    // Selected categories (canonical order). Empty/bookmarked → show everything.
    const parsed = parseCategories(searchParams.get('categories'));
    const selectedKeys = parsed.length ? parsed : CATEGORY_KEYS;
    const categories = selectedKeys.map(k => CATEGORY_MAP[k]);

    // Live per-category counts; categories with 0 available offers are skipped.
    const { counts, loading: countsLoading } = useCoRegPathValues();
    const renderedCategories = categories.filter(c => counts[c.key] > 0);
    const matchingCount = renderedCategories.reduce((sum, c) => sum + counts[c.key], 0);

    // Live offers per category (falls back to config offers on empty/error).
    const { offersByCategory, loading: offersLoading } = useOffersByCategories(selectedKeys);

    // "Other Opportunities" cross-sell, sourced from the usc_other path.
    const { offers: otherOffers } = useOtherOpportunities(3);

    // Show the sticky nav once the inline nav has scrolled above the viewport.
    useEffect(() => {
        const onScroll = () => {
            if (!inlineNavRef.current) return;
            setSticky(inlineNavRef.current.getBoundingClientRect().bottom <= 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const sourceMeta = () => ({ sid: trackingState.sid, pid: trackingState.pid, eid: trackingState.eid });

    // Shared redirect: fire pixels, open a blank tab synchronously (so popup
    // Match the reference: show the 2s handoff modal first (so it's actually
    // visible), THEN open the shaped partner URL in a new tab. Opening the tab
    // up front would steal focus and hide the modal.
    const openOffer = (offer) => {
        if (!offer || !offer.partner_url) return;
        setExecute(true);
        const url = buildLinkout(offer.partner_url, offer.link_shape || 'default', trackingState);
        trackOfferEvent('redirect_modal_shown', { offer_id: offer.id });
        setModalOpen(true);
        clearTimeout(redirectTimer.current);
        redirectTimer.current = setTimeout(() => {
            window.open(url, '_blank');
            trackOfferEvent('offer_redirect_opened', { offer_id: offer.id, ...sourceMeta() });
            setModalOpen(false);
        }, 2000);
    };

    const handleOfferClick = (offer, meta = {}) => {
        trackOfferEvent('offer_card_clicked', {
            offer_id: offer.id,
            offer_category: offer.category,
            offer_rank: meta.rank,
            badge: meta.badge,
            ...sourceMeta(),
        });
        openOffer(offer);
    };

    const handleCrossSellClick = (offer) => {
        trackOfferEvent('other_opportunity_clicked', { offer_id: offer.id, title: offer.title, ...sourceMeta() });
        openOffer(offer);
    };

    useEffect(() => () => clearTimeout(redirectTimer.current), []);

    // Fire once when the wall is viewed, after live counts resolve.
    const viewedRef = useRef(false);
    useEffect(() => {
        if (countsLoading || viewedRef.current) return;
        viewedRef.current = true;
        trackOfferEvent('offer_wall_viewed', {
            categories: renderedCategories.map(c => c.key).join(','),
            count: matchingCount,
        });
        // eslint-disable-next-line
    }, [countsLoading]);

    return (
        <div className={styles.page}>
            <div className={styles.topline} />

            <div className={`${styles.stickyShell} ${sticky ? styles.show : ''}`}>
                <CategoryNav categories={renderedCategories} variant="sticky" />
            </div>

            <div className={styles.wrap}>
                <div className={styles.header}>
                    <div className={styles.logo}><img src={logo} alt="United States Credit" /></div>
                    <div className={styles.bookmarkWrap}>
                        <button
                            type="button"
                            className={styles.bookmarkPill}
                            onClick={handleBookmarkClick}
                        >
                            ⭐ Bookmark this page and come back anytime
                        </button>
                        {showBookmarkHint && (
                            <div className={styles.bookmarkHint} role="status" aria-live="polite">
                                Press <kbd>{bookmarkKeys}</kbd> to bookmark this page
                            </div>
                        )}
                    </div>
                </div>

                <section className={styles.hero}>
                    <div className={styles.heroGrid}>
                        <div>
                            <h1>
                                <span className={styles.desktopHeroTitle}>Explore Your Matching Offers</span>
                                <span className={styles.mobileHeroTitle}>Explore Your Offers</span>
                            </h1>
                            <p className={styles.desktopHeroCopy}>
                                Review the offers that match your selections. Use the category shortcuts
                                below to jump directly to each section. Each offer opens in a new tab so you
                                can compare opportunities and come back anytime.
                            </p>
                            <p className={styles.mobileProTip}>
                                💡 PRO TIP: Explore multiple offers to improve your chances of finding the right match.
                            </p>
                        </div>
                        <div className={styles.score}>
                            <strong>{matchingCount}</strong>
                            <span>matching offers</span>
                        </div>
                    </div>
                </section>

                <div ref={inlineNavRef}>
                    <CategoryNav categories={renderedCategories} variant="inline" />
                </div>

                {offersLoading || countsLoading || !offersByCategory ? (
                    <div style={{ padding: '40px 0' }}><Loading /></div>
                ) : (
                    renderedCategories.map(cat => (
                        <CategorySection
                            key={cat.key}
                            category={cat}
                            offers={offersByCategory[cat.key] || []}
                            onSelect={handleOfferClick}
                        />
                    ))
                )}

                <CrossSell offers={otherOffers} onSelect={handleCrossSellClick} />

                <footer className={styles.footer}>
                    <a href="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a> | <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <br /><br />
                    © 2026 United States Credit
                </footer>
            </div>

            <RedirectModal open={modalOpen} />
        </div>
    );
};

export default Radium(OfferWall);
