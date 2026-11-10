import { useEffect, useState } from 'react';
import { isPrivacySuppressed } from '../privacy';
import { AD_CLIENT, forcedAdLevel, isLoansPath, resolveAdLevel, visitorIdFor, reportAppliedLevel, writeLevelToUrl } from '../adLevel';
import { getCookie } from '../helpers';
import trackOfferEvent from '../trackOfferEvent';

// The AdSense tag, decided once per document load — by the per-source level
// the Bluekeel console sets (utils/adLevel.js; routing-engine ENGINE.md
// § AdSense levels) when the engine answers one, and by this file's legacy
// gates when it does not: an engine that is down, a blocked request, or a
// stage where the levels are switched off all leave the site as it was.
//
// Levels: 0 no tag; 1 the tag without the publisher id (so Google places no
// in-page Auto ads) and the layout's own AdUnit; 2 the tag with the publisher
// id, no anchor; 3 the tag with the bottom anchor forced on
// (data-overlays="bottom" — Google's documented override) and links
// untouched. At 1 and 2 every link opts out of vignettes: on staging
// (2026-11-04) Google preloaded a vignette for a page whose links were not
// marked even when the tag carried no publisher id — the unit's own
// data-ad-client names it — and preloaded none when every link was marked.
// `data-ad-level` on <html> says what was applied.
//
// Kept whatever the engine says: ads=no is a manual off everywhere and a
// browser that opted out of sale / sharing gets no ad tag at all — neither
// makes a request. The loan pages follow the console's rules like every other
// page (the owner, 2026-11-06); their old opt-in (ads only with ads=yes) holds
// only in the legacy branch, so a stage with the levels switched off reads as
// it always did.
const SCRIPT = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const badSids = [10007];
const badPids = [3655];

const mark = (v) => { try { document.documentElement.dataset.adLevel = String(v); } catch (e) { /* no document */ } };

const injectTag = ({ client = true, overlays = null } = {}) => {
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = client ? `${SCRIPT}?client=${AD_CLIENT}` : SCRIPT;
    script.crossOrigin = 'anonymous';
    if (overlays) script.dataset.overlays = overlays;
    document.head.appendChild(script);
};

// Levels 1 and 2: every link opts out of vignettes — the ones on the page now and
// every one the app or System1's RAMP renders later. Both attribute names
// Google has used, so the older and the current tag read it.
const NO_VIGNETTE = ['data-google-vignette', 'data-google-interstitial'];
const markLink = (a) => { for (const attr of NO_VIGNETTE) if (!a.hasAttribute(attr)) a.setAttribute(attr, 'false'); };
const markLinksNoVignette = () => {
    const markAll = (root) => { if (root?.querySelectorAll) root.querySelectorAll('a[href]').forEach(markLink); if (root?.matches?.('a[href]')) markLink(root); };
    markAll(document.body);
    if (typeof MutationObserver !== 'function' || !document.body) return;
    const observer = new MutationObserver((records) => { for (const r of records) r.addedNodes.forEach(markAll); });
    observer.observe(document.body, { childList: true, subtree: true });
};

const report = (level, match, r = null) => {
    try { window.gtag?.('set', 'user_properties', { ad_level: String(level ?? 'legacy') }); } catch (e) { /* analytics is best-effort */ }
    trackOfferEvent('ad_level', { ad_level: String(level ?? 'legacy'), ad_match: match || 'legacy', ...(r?.reason ? { ad_reason: r.reason } : {}), ...(r?.experimentId ? { ad_experiment: `${r.experimentId}.${r.arm}` } : {}) });
};

// The loan pages only (2026-11-10): the visitor's hsid rides the question when
// the page already has one — the landing URL's, or the cookie of an earlier
// page — and the level applied is written into the URL before the tag loads.
// A first visit has no hsid yet when the tag is placed; the decision is NOT
// delayed for it — the page applies the rules' level as always and reports the
// arrival once the hsid cookie appears (helpers.js sendHitStreetHSID).
const HSID_WAIT_MS = 10000;
const reportWhenIdArrives = ({ sid, eid, level }) => {
    const started = Date.now();
    const tick = () => {
        const vid = visitorIdFor({ pathname: window.location.pathname, hsid: getCookie('hsid') });
        if (vid) { reportAppliedLevel({ sid, eid, vid, level }); return; }
        if (Date.now() - started < HSID_WAIT_MS) setTimeout(tick, 500);
    };
    setTimeout(tick, 500);
};

const useAdSense = (tracking) => {
    const { SID, PID, EID, ADS } = tracking;
    const sid = Number(SID);
    const pid = Number(PID);
    const [adLevel, setAdLevel] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const legacyOptIn = isLoansPath(window.location.pathname) ? ADS === 'yes' : true;
        const legacyAllowed = !!sid && sid !== 'undefined' && !badSids.includes(sid) && !badPids.includes(pid) && legacyOptIn;
        const forced = forcedAdLevel({ pathname: window.location.pathname, ads: ADS, privacySuppressed: isPrivacySuppressed() });
        if (forced === 0) { mark(0); return undefined; }

        const loans = isLoansPath(window.location.pathname);
        const vid = visitorIdFor({ pathname: window.location.pathname, hsid: Number(tracking.HSID) ? tracking.HSID : getCookie('hsid') });
        const sidText = String(SID ?? '');
        const eidText = String(EID ?? '');
        resolveAdLevel({ sid: sidText, eid: eidText, vid }).then((r) => {
            if (cancelled) return;
            if (!r || r.level === null || r.level === undefined) {
                // Legacy: today's gates, the tag with the publisher id.
                if (loans) { writeLevelToUrl({ level: null }); if (!vid) reportWhenIdArrives({ sid: sidText, eid: eidText, level: null }); }
                if (legacyAllowed) injectTag({ client: true });
                mark('legacy');
                report(null, r?.match);
                return;
            }
            const level = r.level;
            if (loans) { writeLevelToUrl({ level, experimentId: r.experimentId, arm: r.arm }); if (!vid) reportWhenIdArrives({ sid: sidText, eid: eidText, level }); }
            if (level === 1) { injectTag({ client: false }); markLinksNoVignette(); }
            else if (level === 2) { injectTag({ client: true }); markLinksNoVignette(); }
            else if (level === 3) injectTag({ client: true, overlays: 'bottom' });
            mark(level);
            setAdLevel(level);
            report(level, r.match, r);
        });
        return () => { cancelled = true; };
        // eslint-disable-next-line
    }, []);

    return adLevel;
};

export default useAdSense;
