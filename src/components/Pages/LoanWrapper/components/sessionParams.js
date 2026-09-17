// bkform reads its tracking ids from the page URL — `cid1` / `sub1` / `sub2`
// (→ the Bluekeel console's attribution: source = site key, subsource = sub1),
// the same slots the third-party form used to read. Enrich the URL with the
// session's hitstreet click id + source ids before the form script executes,
// preserving every existing param, the hash and react-router's history state
// (its location does not change, so no re-render follows).
//
// Every visitor, since 2026-09-17: the routing engine reports a sold lead to
// bkroute's pixel_fire with `cid1` as the hsid, so a lead without it is a
// conversion that is never counted. (The vendor-era rule that left
// ?hsid-carrying URLs alone is superseded; the `hsid` param itself is still
// never touched.) An id the session does not have is left out rather than
// written as "null".
export const enrichUrlWithSession = ({ hsid, sid, eid }) => {
    if (!hsid) return false;
    const search = new URLSearchParams(window.location.search);
    Object.entries({ cid1: hsid, sub1: sid, sub2: eid }).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') search.set(key, value);
    });
    window.history.replaceState(window.history.state, '', `${window.location.pathname}?${search}${window.location.hash}`);
    return true;
};

// Drop bkform's `?test=<lender>` switch from the URL (production hosts only —
// see BkFormEmbed). Same replaceState discipline as above: everything else in
// the URL and react-router's history state are preserved.
export const stripTestParam = () => {
    const search = new URLSearchParams(window.location.search);
    if (!search.has('test')) return false;
    search.delete('test');
    const query = search.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
    return true;
};
