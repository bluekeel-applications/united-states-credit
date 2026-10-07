import { normalizeAdSource, inferAdSourceFromClickIds } from '../adSource';
import { fillTrackingTemplate } from '../fillTrackingTemplate';

// Offerbucks (All Day Long Media) landing-URL contract — reference/Offerbucks_Integration_Guide.pdf:
//   https://abouttopic.com/lander/{slug}?utm_source=&channelid=&adcreative=&utm_term=[&kw=&rs=]
// Required: utm_source (one of adSource.AD_SOURCES), channelid (ours: 37103–38103),
// adcreative (the exact ad text, spaces as "+"), utm_term (placement). Optional: kw
// (comma-separated keyword override), rs (related searches, 1–20). Any click id on the
// URL (gclid, fbclid, ttclid, ob_click_id, tblci) is captured by the partner. Extra params
// are allowed but must be declared to them: the base step adds eid, and we add hsid so
// their server-side postback can echo it — https://bkroute.com/pixel_fire?hsid={hsid}.
//
// Every value is resolved inbound-first (what the ad network put on our landing URL,
// now in trackingState), then from the base offer's admin-entered fallback
// (`offer.offerbucks`, set in bluekeel-services' Base Offer dialog). Either side may
// use ${name} placeholders — channelid=${eid}-${sid} — filled from trackingState
// (utils/fillTrackingTemplate.js); a candidate that fills to nothing falls through.

export const OFFERBUCKS_CLICK_IDS = ['gclid', 'fbclid', 'ttclid', 'ob_click_id', 'tblci'];

const first = (...values) => {
    const hit = values.find((v) => v !== undefined && v !== null && String(v).trim() !== '');
    return hit === undefined ? null : String(hit).trim();
};

const relatedSearches = (rs) => {
    const n = Number(rs);
    return Number.isInteger(n) && n >= 1 && n <= 20 ? n : null;
};

export const resolveOfferbucksParams = (tracking = {}, config = {}) => {
    const t = tracking || {};
    const c = config || {};
    const fill = (v) => fillTrackingTemplate(v, t);
    const pick = (...values) => first(...values.map(fill));
    return {
        utm_source: normalizeAdSource(fill(t.utm_source)) || inferAdSourceFromClickIds(t) || normalizeAdSource(fill(c.utm_source)),
        // A String passed through as given (templates filled), never range-checked:
        // the owner may concatenate an eid onto the channel number.
        channelid: pick(t.channelid, c.channelid),
        adcreative: pick(t.adcreative, t.utm_content, c.adcreative),
        utm_term: pick(t.utm_term, t.placement, c.utm_term, t.sid),
        kw: pick(c.kw),
        rs: relatedSearches(c.rs)
    };
};

// Mutates and returns the URL object. URLSearchParams encodes spaces as "+",
// which is exactly what the partner asks for in adcreative.
export const applyOfferbucksParams = (url, tracking = {}, config = {}) => {
    const t = tracking || {};
    const params = resolveOfferbucksParams(t, config);
    Object.keys(params).forEach((key) => {
        if (params[key] !== null) url.searchParams.set(key, String(params[key]));
    });
    OFFERBUCKS_CLICK_IDS.forEach((name) => {
        if (t[name]) url.searchParams.set(name, String(t[name]));
    });
    if (t.hsid) url.searchParams.set('hsid', String(t.hsid));
    return url;
};
