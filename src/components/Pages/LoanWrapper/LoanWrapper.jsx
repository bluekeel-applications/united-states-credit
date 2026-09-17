import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import LoanLanding from './components/LoanLanding';
import LegalCenter from './components/LegalCenter';
import LegalPage from './components/LegalPage';
import { LEGAL_PAGES, LEGAL_CENTER_META, LEGACY_SLUGS, LOANS_HOME, pathFor } from './loanPages';
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

// A retired slug, or a URL written against the legal package's route map
// (/loans/legal-center/<slug>), → where that document lives now. The query
// (tracking ids) and the #section survive; an unknown slug lands on the hub.
const LegacyRedirect = ({ slug }) => {
    const params = useParams();
    const { search, hash } = useLocation();
    const requested = slug ?? params.slug;
    const target = LEGACY_SLUGS[requested] ?? requested;
    const known = LEGAL_PAGES.some((page) => page.slug === target);
    return <Navigate to={{ pathname: pathFor(known ? target : LEGAL_CENTER_META.slug), search, hash }} replace />;
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
            {Object.keys(LEGACY_SLUGS).map((slug) => (
                <Route key={slug} path={slug} element={<LegacyRedirect slug={slug} />} />
            ))}
            <Route path='legal-center/:slug' element={<LegacyRedirect />} />
            <Route path='*' element={<Navigate to={LOANS_HOME} replace />} />
        </Routes>
    );
};

export default LoanWrapper;
