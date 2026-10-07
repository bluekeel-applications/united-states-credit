// Fills ${name} placeholders in a partner param from the visitor's trackingState,
// so a media buyer (on the landing URL) or an admin fallback (on the base offer)
// can compose a value from what the session knows — e.g. channelid=${eid}-${sid}
// goes out as channelid=<eid>-<sid>.
//
// Rules: one pass, no recursion; only the identifiers in TEMPLATE_KEYS are
// substitutable (nothing a visitor typed about themselves — email, name, address,
// ip — can be pulled into an outbound URL this way); a placeholder with no value,
// or an unknown name, becomes '' so no literal macro travels to the partner.
export const TEMPLATE_KEYS = [
    // Bluekeel session ids
    'pid', 'sid', 'eid', 'oid', 'uid', 'hsid', 'subid', 'segment', 'se', 'kwd', 'pacid', 'pt1', 'pt2', 'article', 'display', 'ads',
    // ad-network click ids
    'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'ob_click_id', 'tblci',
    // ad-network params captured on the landing URL
    'utm_source', 'utm_term', 'utm_content', 'adcreative', 'placement', 'channelid',
    // coarse location from the geo lookup
    'city', 'state', 'zip', 'country'
];

const PLACEHOLDER = /\$\{\s*([A-Za-z0-9_]+)\s*\}/g;

export const hasTemplate = (value) => typeof value === 'string' && /\$\{[^}]*\}/.test(value);

export const fillTrackingTemplate = (value, tracking = {}) => {
    if (!hasTemplate(value)) return value;
    const t = tracking || {};
    return value.replace(PLACEHOLDER, (_, name) => {
        if (!TEMPLATE_KEYS.includes(name)) return '';
        const v = t[name];
        return v === undefined || v === null ? '' : String(v);
    });
};

export default fillTrackingTemplate;
