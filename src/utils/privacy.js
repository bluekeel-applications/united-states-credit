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

// What monitoring may never learn: a bank routing number. The loan form's
// bank-name lookup calls `<lead API>/banks/<routing number>`, and the
// monitoring vendor records the URL of every request a page makes. This is
// the vendor SDK's `beforeSend` (App.jsx): it rewrites that path segment
// before an event leaves the browser, in every place an event can carry a URL
// — the request itself, an error's request, message or stack, the view. It
// changes nothing else and never drops an event. (Final compliance cleanup,
// 2026-09-29: the Legal Center says routing numbers are not retained after
// transmission; a third party's request log is not an exception to that.)
const ROUTING_NUMBER_IN_PATH = /(\/banks\/)\d+/g;

export const redactRoutingNumber = (text) => (typeof text === 'string' ? text.replace(ROUTING_NUMBER_IN_PATH, '$1[redacted]') : text);

export const redactMonitoringEvent = (event) => {
    try {
        if (event?.resource?.url) event.resource.url = redactRoutingNumber(event.resource.url);
        if (event?.error) {
            if (event.error.resource?.url) event.error.resource.url = redactRoutingNumber(event.error.resource.url);
            if (event.error.message) event.error.message = redactRoutingNumber(event.error.message);
            if (event.error.stack) event.error.stack = redactRoutingNumber(event.error.stack);
        }
        if (event?.view) {
            if (event.view.url) event.view.url = redactRoutingNumber(event.view.url);
            if (event.view.referrer) event.view.referrer = redactRoutingNumber(event.view.referrer);
        }
    } catch (e) {
        // an event the SDK will not let us edit is sent as it is — monitoring is never broken from here
    }
    return true;
};
