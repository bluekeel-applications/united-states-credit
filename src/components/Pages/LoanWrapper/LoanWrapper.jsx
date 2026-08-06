import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoanLanding from './components/LoanLanding';
import LegalCenter from './components/LegalCenter';
import LegalPage from './components/LegalPage';
import { LEGAL_PAGES, LOANS_HOME } from './loanPages';
import { CONTENT_BY_SLUG } from './content';
import useLoanTrack, { slugFromPathname, titleForSlug } from './useLoanTrack';

const normalize = (path) => path.replace(/\/+$/, '') || '/';

// Path of the initial DOCUMENT load — the automatic page_view that
// gtag('config', ...) in public/index.html already sent. Read from the
// Performance Navigation entry, NOT import-time window.location: this module
// is lazy-loaded, so by eval time a client-side navigation may already have
// moved the URL to /loans.
const documentLoadPath = (() => {
    try {
        const nav = performance.getEntriesByType('navigation')[0];
        return normalize(new URL(nav ? nav.name : window.location.href, window.location.origin).pathname);
    } catch (e) {
        return normalize(window.location.pathname);
    }
})();
let initialPageviewConsumed = false; // module-level: survives LoanWrapper remounts

// GA4 SPA pageviews for /loans routes, deduped against the document-load
// page_view (covers direct landings and the footer's target=_blank tabs).
const useLoanPageview = () => {
    const { pathname } = useLocation();
    const track = useLoanTrack();
    useEffect(() => {
        if (!initialPageviewConsumed) {
            initialPageviewConsumed = true;
            if (normalize(pathname) === documentLoadPath) return;
        }
        const pageTitle = titleForSlug(slugFromPathname(pathname));
        if (!pageTitle) return; // transient wildcard path; the redirect to /loans fires next
        track('page_view', {
            page_path: pathname,
            page_title: pageTitle,
            page_location: window.location.href,
        });
        // pathname is the real trigger; track identity churns with it anyway
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
};

// Scroll to top when navigating between /loans pages, but stay hash-aware so
// #sN TOC anchors and the #main skip link keep native fragment behavior.
const useLoanScroll = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
            return;
        }
        window.scrollTo(0, 0);
        // hash deliberately not a dep: hash-only changes are browser-native
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
};

const LoanWrapper = () => {
    useLoanScroll();
    useLoanPageview();

    // The reference sets html{scroll-behavior:smooth}; inline styles can't
    // reach <html>, so opt in while mounted and restore on unmount.
    useEffect(() => {
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => { document.documentElement.style.scrollBehavior = prev; };
    }, []);

    return (
        <Routes>
            <Route index element={<LoanLanding />} />
            <Route path='legal-center' element={<LegalCenter />} />
            {LEGAL_PAGES.map((page) => (
                <Route
                    key={page.slug}
                    path={page.slug}
                    element={<LegalPage page={page} content={CONTENT_BY_SLUG[page.slug]} />}
                />
            ))}
            <Route path='*' element={<Navigate to={LOANS_HOME} replace />} />
        </Routes>
    );
};

export default LoanWrapper;
