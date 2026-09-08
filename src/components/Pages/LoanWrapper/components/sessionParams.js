// Both lender forms read tracking ids from the page URL: the third-party form
// its sub-ids, bkform `cid1` / `sub1` / `sub2` (→ the Bluekeel console's
// attribution: source = site key, subsource = sub1). Only when the visitor
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
