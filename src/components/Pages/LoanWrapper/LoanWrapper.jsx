import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoanLanding from './components/LoanLanding';
import LegalCenter from './components/LegalCenter';
import LegalPage from './components/LegalPage';
import { LEGAL_PAGES, LOANS_HOME } from './loanPages';
import { CONTENT_BY_SLUG } from './content';

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
