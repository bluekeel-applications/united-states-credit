// Which ad network sent this visitor, in the vocabulary search partners expect.
// Offerbucks only records conversions for utm_source ∈ AD_SOURCES, so anything
// else — including the synthetic `${article}-${sid}` our own /rsoc reload writes
// into the URL — is treated as unknown and falls through to the next signal.
export const AD_SOURCES = ['taboola', 'facebook', 'gdn', 'outbrain', 'tiktok'];

const ALIASES = {
    fb: 'facebook',
    meta: 'facebook',
    ig: 'facebook',
    instagram: 'facebook',
    google: 'gdn',
    adwords: 'gdn',
    google_ads: 'gdn',
    googleads: 'gdn',
    tt: 'tiktok',
    ob: 'outbrain',
    tb: 'taboola',
    tbl: 'taboola'
};

export const normalizeAdSource = (raw) => {
    if (!raw) return null;
    const key = String(raw).trim().toLowerCase();
    if (AD_SOURCES.includes(key)) return key;
    return ALIASES[key] || null;
};

// A network's click id is proof of the network. Google last: its ids are also
// the ones most likely to be a stale 90-day cookie on this site.
export const inferAdSourceFromClickIds = (tracking = {}) => {
    if (tracking.tblci) return 'taboola';
    if (tracking.fbclid) return 'facebook';
    if (tracking.ttclid) return 'tiktok';
    if (tracking.ob_click_id) return 'outbrain';
    if (tracking.gclid || tracking.gbraid || tracking.wbraid) return 'gdn';
    return null;
};
