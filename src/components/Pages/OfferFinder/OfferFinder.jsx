import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Radium from 'radium';
import styles from './OfferFinder.module.css';
import logo from '../../../assets/Images/usc_full_logo.png';
import trackOfferEvent from '../../../utils/trackOfferEvent';
import useCoRegPathValues from '../../../utils/hooks/useCoRegPathValues';
import Loading from '../../Shared/Loading';
import {
    FINDER_OPTIONS,
    CATEGORY_KEYS,
} from '../Offers/offerConfig';

// Page 1 — Offer Finder. User selects 1+ categories; a summed match count
// animates up, a CTA reveals, then submit hands the selections to Page 2 via
// ?categories=. Data comes from offerConfig (Phase 1); live counts land Phase 3.
const OfferFinder = () => {
    const navigate = useNavigate();
    const { counts, loading: countsLoading } = useCoRegPathValues();
    const [ selected, setSelected ] = useState(() => new Set());
    const [ displayCount, setDisplayCount ] = useState(0);
    const timerRef = useRef(null);

    // Live counts drive the options; categories with 0 available offers are hidden.
    const options = FINDER_OPTIONS
        .filter(o => counts[o.key] > 0)
        .map(o => ({ ...o, count: counts[o.key] }));
    const everythingTotal = options.reduce((sum, o) => sum + o.count, 0);

    const hasSelection = selected.size > 0;
    const total = CATEGORY_KEYS
        .filter(k => selected.has(k))
        .reduce((sum, k) => sum + (counts[k] || 0), 0);

    // Count-up animation toward the running total (mirrors the prototype).
    useEffect(() => {
        clearInterval(timerRef.current);
        if (total <= 0) { setDisplayCount(0); return undefined; }
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { setDisplayCount(total); return undefined; }
        let current = 0;
        const step = Math.max(1, Math.ceil(total / 25));
        timerRef.current = setInterval(() => {
            current += step;
            if (current >= total) { current = total; clearInterval(timerRef.current); }
            setDisplayCount(current);
        }, 18);
        return () => clearInterval(timerRef.current);
    }, [total]);

    const toggle = (key) => {
        const wasSelected = selected.has(key);
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
        trackOfferEvent(wasSelected ? 'category_deselected' : 'category_selected', { category: key });
    };

    // "Show me everything" selects all available (count>0) categories (brief §3.4).
    const selectAll = () => {
        setSelected(new Set(options.map(o => o.key)));
        trackOfferEvent('category_selected', { category: 'all' });
    };

    const submit = () => {
        if (!hasSelection) return;
        const ordered = CATEGORY_KEYS.filter(k => selected.has(k));
        trackOfferEvent('page1_submit', { categories: ordered.join(','), total });
        navigate(`/offers?categories=${ordered.join(',')}`);
    };

    return (
        <div className={styles.page}>
            <div className={styles.topline} />

            <main className={styles.container}>
                <div className={styles.logo}>
                    <img src={logo} alt="United States Credit" />
                </div>

                <section className={styles.hero}>
                    <div className={styles.left}>
                        <div>
                            <div className={styles.badge}>⚡ 60-Second Offer Finder</div>
                            <h1 className={styles.desktopHeadline}>Find the Best Loan, Savings, and Credit Offers Available</h1>
                            <h1 className={styles.mobileHeadline}>The Best Loan, Credit, and Savings Offers</h1>
                            <p className={styles.lead}>Compare personalized loan, credit, savings and income offers matched to your needs.</p>
                        </div>

                        <div className={styles.trustbox}>
                            <h3>A simple way to explore your options</h3>
                            <div className={styles.trustgrid}>
                                <div className={styles.trustitem}>
                                    <div className={styles.check}>✓</div>
                                    <div>
                                        <strong>Free to use</strong>
                                        <span>Browse available matches without paying to start.</span>
                                    </div>
                                </div>
                                <div className={styles.trustitem}>
                                    <div className={styles.check}>✓</div>
                                    <div>
                                        <strong>Secure experience</strong>
                                        <span>Designed to help route you to relevant opportunities.</span>
                                    </div>
                                </div>
                                <div className={styles.trustitem}>
                                    <div className={styles.check}>✓</div>
                                    <div>
                                        <strong>No obligation</strong>
                                        <span>You choose which offers or categories you want to explore.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.form}>
                        <h2>
                            <span className={styles.desktopFormTitle}>What are you looking for today?</span>
                            <span className={styles.mobileFormTitle}>What are you looking for?</span>
                        </h2>
                        <div className={styles.sub}>Choose one or more options to see your matches.</div>

                        {countsLoading ? (
                            <div style={{ padding: '24px 0' }}><Loading /></div>
                        ) : (
                            <>
                                {options.map(opt => {
                                    const active = selected.has(opt.key);
                                    return (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            className={`${styles.option} ${active ? styles.active : ''}`}
                                            aria-pressed={active}
                                            onClick={() => toggle(opt.key)}
                                        >
                                            <div className={styles.icon}>{opt.icon}</div>
                                            <div className={styles.main}>
                                                <strong>{opt.label}</strong>
                                                <span>{opt.sublabel}</span>
                                            </div>
                                            <div className={styles.countpill}>{opt.count}</div>
                                        </button>
                                    );
                                })}

                                <button
                                    type="button"
                                    className={`${styles.option} ${styles.allOption}`}
                                    onClick={selectAll}
                                >
                                    <div className={styles.icon}>⭐</div>
                                    <div className={styles.main}>
                                        <strong>Show me everything</strong>
                                        <span>View all available categories</span>
                                    </div>
                                    <div className={styles.countpill}>{everythingTotal}</div>
                                </button>
                            </>
                        )}

                        {!countsLoading && !hasSelection && (
                            <div className={styles.helper}>Select an option to see your available matches.</div>
                        )}

                        {hasSelection && (
                            <div className={styles.results} role="status" aria-live="polite">
                                <div className={styles.good}>🎉 Matching Offers Found</div>
                                <div className={styles.matches}>{displayCount} Matches</div>
                                <button className={styles.cta} type="button" onClick={submit}>
                                    Show Me My {total} Offers →
                                </button>
                            </div>
                        )}

                        {hasSelection && (
                            <div className={styles.compliance}>
                                🔒 By submitting, you agree to our{' '}
                                <a href="/privacy">Privacy Policy</a> and{' '}
                                <a href="/terms">Terms &amp; Conditions</a>.
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div>
                    <a href="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
                    {' | '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>
                <div className={styles.copyright}>© 2026 United States Credit. All Rights Reserved.</div>
            </footer>
        </div>
    );
};

export default Radium(OfferFinder);
