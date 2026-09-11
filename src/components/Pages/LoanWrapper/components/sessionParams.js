// bkform reads its tracking ids from the page URL — `cid1` / `sub1` / `sub2`
// (→ the Bluekeel console's attribution: source = site key, subsource = sub1),
// the same slots the third-party form used to read. Only when the visitor
// arrived WITHOUT ?hsid (user decision — hsid-carrying URLs are left completely
// untouched): enrich the URL with the session's hitstreet click id + source ids
// before the form script executes, preserving every existing param, the hash
// and react-router's history state (its location does not change, so no
// re-render follows).
export const enrichUrlWithSession = ({ hsid, sid, eid }) => {
    const search = new URLSearchParams(window.location.search);
    if (search.get('hsid') || !hsid) return false;
    search.set('cid1', hsid);
    search.set('sub1', sid);
    search.set('sub2', eid);
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
