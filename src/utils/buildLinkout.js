// Builds the partner redirect URL with tracking params injected, shaped by the
// offer's link_shape. Extracted verbatim from ButtonGroupPage so the offer wall,
// the redirect modal, and System1 all share one implementation.
// `tracking` is the trackingState object (pid, sid, eid, hsid, uid, fbid).
const buildLinkout = (url, shape, tracking) => {
    const url_base = new URL(url);
    url_base.searchParams.set('eid', `${tracking.pid}-${tracking.sid}-${tracking.eid}`);
    const new_url = url_base.toString();

    switch (shape) {
        case 'tapstone': {
            const subId = `subid=${tracking.sid}-${tracking.eid}`;
            const facebook = `src=${tracking.fbid ? tracking.fbid : '202255056230822'}`;
            const clickid = `clickid=${tracking.hsid}`;
            return `${new_url}?dpco=1&${subId}&${facebook}&${clickid}&subid2=${tracking.hsid}`;
        }
        case 'peak': {
            const s1 = `s1=${tracking.sid}`;
            const s2 = `s2=${tracking.eid}`;
            const s3 = `s3=${tracking.hsid}`;
            const pclid = `pclid=${tracking.uid}`;
            const subid2 = `subid2=${tracking.hsid}`;
            return `${new_url}&${s1}&${s2}&${s3}&${pclid}&${subid2}`;
        }
        default:
            return `${new_url}&subid2=${tracking.hsid}`;
    }
};

export default buildLinkout;
