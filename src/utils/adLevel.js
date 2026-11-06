// The per-source AdSense level, read from the routing engine at page load.
//
// Which level a visitor's SID × EID gets is decided in the Bluekeel console
// (Websites › AdSense levels) and served by the engine's GET /ad-level —
// routing-engine ENGINE.md § AdSense levels. This module asks once per
// session (the answer is kept in sessionStorage for five minutes), never
// throws, and answers null for anything but a clear level, which the hook
// reads as "keep the legacy gates" — so an engine that is down, a blocked
// request or a stage that has not switched the levels on leaves the site
// exactly as it was.
//
// The levels, as the page applies them (useAdSense.jsx):
//   0  off         no AdSense tag at all
//   1  units only  the tag without the publisher id (no in-page Auto ads) + AdUnit; links opted out of vignettes
//   2  standard    Auto ads in-page; links opted out of vignettes; no anchor
//   3  everything  Auto ads + the bottom anchor forced on + vignettes on clicks
import { bkformTargets, BKFORM_SITE_KEY } from '../components/Pages/LoanWrapper/bkform.config';

export const AD_CLIENT = 'ca-pub-5105418052368941';
export const AD_LEVEL_TTL_MS = 5 * 60 * 1000;
export const AD_LEVEL_TIMEOUT_MS = 2000;
const KEY = (sid, eid) => `adlevel:${sid}:${eid}`;

// The engine stage for the host (the same split as the loan form), or an
// explicit override for local development.
export const adLevelEndpoint = (hostname = (typeof window !== 'undefined' ? window.location.hostname : '')) =>
    process.env.REACT_APP_AD_LEVEL_ENDPOINT || `${bkformTargets(hostname).apiBase}/ad-level`;

// The gates the page keeps whatever the engine says. 0 = forced off, with no
// request made; null = ask the engine. ads=no is a manual override everywhere
// and a browser that opted out of sale / sharing gets no ad tag at all
// (src/utils/privacy.js). The loan pages are governed by the console's rules
// like every other page (the owner, 2026-11-06); their old opt-in — ads only
// with ads=yes — survives only in the hook's legacy branch, for a stage where
// the levels are switched off.
export const forcedAdLevel = ({ pathname = '', ads = '', privacySuppressed = false } = {}) => {
    if (privacySuppressed) return 0;
    if (ads === 'no') return 0;
    return null;
};

export const isLoansPath = (pathname = '') => pathname === '/loans' || pathname.startsWith('/loans/');

const storage = () => { try { return typeof window !== 'undefined' ? window.sessionStorage : null; } catch (e) { return null; } };

export const readCachedLevel = (sid, eid, now = Date.now()) => {
    try {
        const raw = storage()?.getItem(KEY(sid, eid));
        if (!raw) return null;
        const v = JSON.parse(raw);
        if (!v || typeof v !== 'object' || !Number.isFinite(v.at) || now - v.at > AD_LEVEL_TTL_MS) return null;
        if (v.level !== null && !Number.isInteger(v.level)) return null;
        return { level: v.level, match: v.match || null, cached: true };
    } catch (e) { return null; }
};

export const writeCachedLevel = (sid, eid, value, now = Date.now()) => {
    try { storage()?.setItem(KEY(sid, eid), JSON.stringify({ level: value.level, match: value.match || null, at: now })); } catch (e) { /* storage may be blocked */ }
};

// One GET, bounded in time. Returns { level, match } — level null when the
// engine answered but the levels are switched off — or null when there was no
// usable answer at all.
export const fetchAdLevel = async ({ sid, eid, siteKey = BKFORM_SITE_KEY, fetchImpl = (typeof window !== 'undefined' ? window.fetch : undefined), timeoutMs = AD_LEVEL_TIMEOUT_MS, endpoint = adLevelEndpoint() } = {}) => {
    if (typeof fetchImpl !== 'function') return null;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
        const url = `${endpoint}?siteKey=${encodeURIComponent(siteKey)}&sid=${encodeURIComponent(sid ?? '')}&eid=${encodeURIComponent(eid ?? '')}`;
        const res = await fetchImpl(url, { method: 'GET', signal: controller?.signal, credentials: 'omit' });
        if (!res || !res.ok) return null;
        const body = await res.json();
        if (!body || typeof body !== 'object') return null;
        if (body.enabled !== true) return { level: null, match: 'disabled' };
        if (!Number.isInteger(body.level) || body.level < 0 || body.level > 3) return null;
        return { level: body.level, match: typeof body.match === 'string' ? body.match : null };
    } catch (e) {
        return null;
    } finally {
        if (timer) clearTimeout(timer);
    }
};

// Cache first, then the engine; a usable answer (a level, or "switched off")
// is cached, a failure is not, so the next page retries.
export const resolveAdLevel = async ({ sid, eid, ...rest } = {}) => {
    const hit = readCachedLevel(sid, eid);
    if (hit) return hit;
    const r = await fetchAdLevel({ sid, eid, ...rest });
    if (r) writeCachedLevel(sid, eid, r);
    return r;
};
