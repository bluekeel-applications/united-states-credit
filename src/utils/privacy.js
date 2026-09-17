// The browser's sale / sharing opt-out, as decided by the first script in
// public/index.html before any tag loads: Global Privacy Control or the stored
// usc_privacy_optout marker. That script is the only place the preference is
// read or written; this module is how the app asks it.
//
// `suppress` is true for an opted-out browser on /loans and everything under
// it. While it is, nothing here may load an advertising, analytics or
// monitoring vendor. First-party calls — the loan form, the lead API, our own
// click ids — are not part of it.
const NONE = { gpc: false, optedOut: false, suppress: false };

export const privacyState = () => (typeof window !== 'undefined' && window.__uscPrivacy) || NONE;

export const isPrivacySuppressed = () => privacyState().suppress === true;

// Records the opt-out for this browser. True only when the marker reads back —
// a browser that blocks both cookies and storage cannot hold the preference,
// and the caller has to say so rather than report success.
export const optOutThisBrowser = () => {
    const { optOut } = privacyState();
    const stored = typeof optOut === 'function' ? optOut() === true : false;
    if (stored) quietRunningVendors();
    return stored;
};

// The vendors this document already started cannot be unloaded — the caller
// reloads for that — but they can be told to stop collecting first, so the
// choice takes effect at the click rather than at the reload.
const quietRunningVendors = () => {
    try {
        window['ga-disable-G-20MVF1Z2ML'] = true;
        window.DD_RUM?.setTrackingConsent?.('not-granted');
    } catch (e) {
        // best effort: the reload that follows is what enforces the choice
    }
};
