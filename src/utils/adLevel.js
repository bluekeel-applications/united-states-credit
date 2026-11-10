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
const KEY = (sid, eid, vid = '') => `adlevel:${sid}:${eid}${vid ? `:${vid}` : ''}`;

// The visitor id the loan pages send with the question (2026-11-10): HitStreet's
// hsid, the same id the loan form posts as `cid1`. With it the engine answers
// for this visitor — a running experiment may put them on an arm — and records
// the arrival once, so a later sale knows which level its visitor was shown
// (routing-engine ENGINE.md § Visit assignment). /loans only: every other page
// asks exactly as before. Opaque and never PII; 0 and anything malformed is no id.
const VID = /^[A-Za-z0-9_.-]{1,64}$/;
// What only a visitor's own answer carries — left off entirely otherwise, so
// an answer without an id reads exactly as it always did.
const own = (v) => ({ ...(v?.reason ? { reason: v.reason } : {}), ...(v?.experimentId && Number.isInteger(v.arm) ? { experimentId: v.experimentId, arm: v.arm } : {}) });
export const visitorIdFor = ({ pathname = '', hsid = null } = {}) => {
    if (!isLoansPath(pathname)) return null;
    const v = String(hsid ?? '').trim();
    return VID.test(v) && v !== '0' ? v : null;
};

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

export const readCachedLevel = (sid, eid, now = Date.now(), vid = '') => {
    try {
        const raw = storage()?.getItem(KEY(sid, eid, vid));
        if (!raw) return null;
        const v = JSON.parse(raw);
        if (!v || typeof v !== 'object' || !Number.isFinite(v.at) || now - v.at > AD_LEVEL_TTL_MS) return null;
        if (v.level !== null && !Number.isInteger(v.level)) return null;
        return { level: v.level, match: v.match || null, ...own(v), cached: true };
    } catch (e) { return null; }
};

export const writeCachedLevel = (sid, eid, value, now = Date.now(), vid = '') => {
    try { storage()?.setItem(KEY(sid, eid, vid), JSON.stringify({ level: value.level, match: value.match || null, ...own(value), at: now })); } catch (e) { /* storage may be blocked */ }
};

// One GET, bounded in time. Returns { level, match } — level null when the
// engine answered but the levels are switched off — or null when there was no
// usable answer at all.
export const fetchAdLevel = async ({ sid, eid, vid = null, applied = undefined, siteKey = BKFORM_SITE_KEY, fetchImpl = (typeof window !== 'undefined' ? window.fetch : undefined), timeoutMs = AD_LEVEL_TIMEOUT_MS, endpoint = adLevelEndpoint() } = {}) => {
    if (typeof fetchImpl !== 'function') return null;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
        const url = `${endpoint}?siteKey=${encodeURIComponent(siteKey)}&sid=${encodeURIComponent(sid ?? '')}&eid=${encodeURIComponent(eid ?? '')}`
            + (vid ? `&vid=${encodeURIComponent(vid)}` : '')
            + (vid && applied !== undefined ? `&applied=${encodeURIComponent(applied === null ? 'legacy' : applied)}` : '');
        const res = await fetchImpl(url, { method: 'GET', signal: controller?.signal, credentials: 'omit' });
        if (!res || !res.ok) return null;
        const body = await res.json();
        if (!body || typeof body !== 'object') return null;
        if (body.enabled !== true) return { level: null, match: 'disabled' };
        if (!Number.isInteger(body.level) || body.level < 0 || body.level > 3) return null;
        // Only an answer for a visitor id carries a reason or an arm (an older engine sends neither).
        return { level: body.level, match: typeof body.match === 'string' ? body.match : null, ...own({ reason: typeof body.reason === 'string' ? body.reason : null, experimentId: typeof body.experiment_id === 'string' ? body.experiment_id : null, arm: body.arm }) };
    } catch (e) {
        return null;
    } finally {
        if (timer) clearTimeout(timer);
    }
};

// Cache first, then the engine; a usable answer (a level, or "switched off")
// is cached, a failure is not, so the next page retries.
export const resolveAdLevel = async ({ sid, eid, vid = null, ...rest } = {}) => {
    const hit = readCachedLevel(sid, eid, Date.now(), vid || '');
    if (hit) return hit;
    const r = await fetchAdLevel({ sid, eid, vid, ...rest });
    if (r) writeCachedLevel(sid, eid, r, Date.now(), vid || '');
    return r;
};

// The page decided before it had a visitor id (a first visit gets its hsid a
// moment after the ad tag is placed): tell the engine which level was applied,
// once the id exists, so the arrival is still counted. Nothing is decided by
// this call and nothing on the page waits for it. Once per id per session.
export const reportAppliedLevel = async ({ sid, eid, vid, level, ...rest } = {}) => {
    if (!vid) return false;
    const flag = `adlevel-reported:${vid}`;
    try { if (storage()?.getItem(flag)) return false; storage()?.setItem(flag, '1'); } catch (e) { /* storage may be blocked */ }
    await fetchAdLevel({ sid, eid, vid, applied: level === undefined ? null : level, ...rest });
    return true;
};

// The level this visitor was shown, written into the loan page's URL before
// the ad tag loads — `adl` (0–3, or `legacy`) and, in an experiment, `axp`
// (`<experiment>.<arm>`) — so the AdSense revenue Google reports per page URL
// can be read per level (ads-insights PNL.md). Same replaceState discipline as
// sessionParams.js: every other param, the hash and the history state kept.
export const writeLevelToUrl = ({ level, experimentId = null, arm = null } = {}) => {
    try {
        if (!isLoansPath(window.location.pathname)) return false;
        const search = new URLSearchParams(window.location.search);
        search.set('adl', level === null || level === undefined ? 'legacy' : String(level));
        if (experimentId && Number.isInteger(arm)) search.set('axp', `${experimentId}.${arm}`); else search.delete('axp');
        window.history.replaceState(window.history.state, '', `${window.location.pathname}?${search}${window.location.hash}`);
        return true;
    } catch (e) { return false; }
};
