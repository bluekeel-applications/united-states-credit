import { useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../context';
import trackOfferEvent from '../../../utils/trackOfferEvent';
import { LOANS_HOME, HOME_META, LEGAL_CENTER_META, LEGAL_PAGES } from './loanPages';

// '/loans' -> 'home', '/loans/privacy-policy' -> 'privacy-policy'
export const slugFromPathname = (pathname) => {
    const rest = pathname.replace(/\/+$/, '').slice(LOANS_HOME.length).replace(/^\//, '');
    return rest || 'home';
};

// Registry lookup — NOT document.title (useDocumentMeta commits in the page's
// own effect, which may run after the caller's). Unknown slug -> undefined so
// the pageview effect can skip transient wildcard-redirect paths.
export const titleForSlug = (slug) => {
    if (slug === 'home') return HOME_META.documentTitle;
    if (slug === LEGAL_CENTER_META.slug) return LEGAL_CENTER_META.documentTitle;
    return LEGAL_PAGES.find((page) => page.slug === slug)?.documentTitle;
};

// GA4 tracking for the /loans page set. Wraps trackOfferEvent (device_type,
// safe no-op) and stamps every event with the funnel source ids — same shape
// as OfferWall's sourceMeta() — plus the current /loans page slug.
const useLoanTrack = () => {
    const { trackingState } = useContext(AppContext);
    const { pathname } = useLocation();
    const { sid, pid, eid } = trackingState;
    return useCallback(
        (name, params = {}) => trackOfferEvent(name, {
            page: slugFromPathname(pathname),
            sid,
            pid,
            eid,
            ...params,
        }),
        [pathname, sid, pid, eid],
    );
};

export default useLoanTrack;
