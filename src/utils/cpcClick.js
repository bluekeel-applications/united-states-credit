// The cost-per-click landing post (routing-engine ENGINE.md § CPC pixel).
//
// Some traffic is bought per click. When a visitor lands on /loans from a
// partner's link, the landing URL carries the HitStreet click id (`hsid`) the
// redirect minted; this module posts that id to the routing engine once, and
// the engine decides — from the tracker's own record of the click and the
// rules set in the Bluekeel console — whether the partner is paid for the
// landing. The page never learns the answer, holds no list of sources and
// never sees a payout: the engine answers `{ ok: true }` to everything.
//
// Only a click id that arrived in the URL is posted. An id the site minted for
// a visitor who came on their own (useHitStreet) or one read back from a
// cookie is not a partner's click. Once per click id per tab session; never
// throws; nothing waits on it.
import { bkformTargets, BKFORM_SITE_KEY } from '../components/Pages/LoanWrapper/bkform.config';
import { isLoansPath } from './adLevel';

// HitStreet's click id: a positive integer the tracker's database can hold.
const HSID = /^[1-9][0-9]{0,9}$/;
const BROWSER_KEY = 'usc_bid';
const BROWSER_ID = /^[A-Za-z0-9_-]{16,64}$/;
const SENT = (hsid) => `cpc-click:${hsid}`;

export const cpcEndpoint = (hostname = (typeof window !== 'undefined' ? window.location.hostname : '')) =>
    `${bkformTargets(hostname).apiBase}/cpc`;

// What a landing would post, or null when there is nothing to post.
export const cpcClickFrom = ({ pathname = '', search = '' } = {}) => {
    if (!isLoansPath(pathname)) return null;
    let params;
    try { params = new URLSearchParams(search); } catch (e) { return null; }
    const hsid = String(params.get('hsid') ?? '').trim();
    if (!HSID.test(hsid) || Number(hsid) > 2147483647) return null;
    return { hsid, sid: String(params.get('sid') ?? '').trim().slice(0, 32), eid: String(params.get('eid') ?? '').trim().slice(0, 64) };
};

const store = (name) => { try { return typeof window !== 'undefined' ? window[name] : null; } catch (e) { return null; } };

// A random id for this browser, kept in localStorage, so the engine does not
// pay twice for the same browser arriving through a second click. Not derived
// from anything about the device, sent only to our own engine, and kept there
// only as a keyed digest. A browser that opted out of sale / sharing is not
// given one (`allow: false`): the engine then goes by the request alone.
export const browserId = ({ allow = true, storage = store('localStorage'), random = (typeof window !== 'undefined' ? window.crypto : null) } = {}) => {
    if (!allow || !storage) return '';
    try {
        const kept = storage.getItem(BROWSER_KEY);
        if (kept && BROWSER_ID.test(kept)) return kept;
        if (!random || typeof random.getRandomValues !== 'function') return '';
        const bytes = random.getRandomValues(new Uint8Array(16));
        const id = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
        storage.setItem(BROWSER_KEY, id);
        return storage.getItem(BROWSER_KEY) === id ? id : '';
    } catch (e) {
        return '';
    }
};

/**
 * Post this landing's click id, once. Resolves true when a post was made.
 * `text/plain` on purpose, like the loan form's beacons: no preflight, and the
 * browser still stamps the Origin the engine checks.
 */
export const reportCpcClick = async ({
    location = (typeof window !== 'undefined' ? window.location : null),
    privacySuppressed = false,
    siteKey = BKFORM_SITE_KEY,
    fetchImpl = (typeof window !== 'undefined' ? window.fetch : undefined),
    session = store('sessionStorage'),
    local = store('localStorage'),
    random = (typeof window !== 'undefined' ? window.crypto : null),
    endpoint = cpcEndpoint(location?.hostname),
} = {}) => {
    try {
        const click = cpcClickFrom({ pathname: location?.pathname, search: location?.search });
        if (!click || typeof fetchImpl !== 'function') return false;
        try { if (session?.getItem(SENT(click.hsid))) return false; } catch (e) { /* no session storage: the engine pays a click id once anyway */ }
        try { session?.setItem(SENT(click.hsid), '1'); } catch (e) { /* as above */ }
        const body = JSON.stringify({ siteKey, ...click, bid: browserId({ allow: !privacySuppressed, storage: local, random }) });
        await fetchImpl(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body, keepalive: true, credentials: 'omit' });
        return true;
    } catch (e) {
        return false;
    }
};
