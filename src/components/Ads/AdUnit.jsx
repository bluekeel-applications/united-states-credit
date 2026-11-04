import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAdLevel } from '../../utils/ads/AdLevelContext';
import { AD_CLIENT } from '../../utils/adLevel';

// The one fixed ad unit of AdSense level 1 ("units only"): a responsive unit
// in a place the layout chooses, rendered only when the engine put this
// visitor's source at level 1. The tag at that level carries no publisher id,
// so Google places nothing itself; data-ad-client on the <ins> is what lets
// this unit serve. The slots are the site's own (Pages/AdSense/AdSenseComp.jsx).
// `slot` names the placement for the staging check; data-ad-unit marks ours
// apart from anything Google might auto-place.
const AdUnit = ({ slot = 'content' }) => {
    const level = useAdLevel();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const pushed = useRef(false);

    useEffect(() => {
        if (level !== 1 || pushed.current) return;
        pushed.current = true;
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ads are best-effort */ }
    }, [level]);

    if (level !== 1) return null;
    return (
        <ins
            className='adsbygoogle'
            style={{ display: 'block', margin: '16px auto', maxWidth: 1200 }}
            data-ad-unit={slot}
            data-ad-client={AD_CLIENT}
            data-ad-slot={isMobile ? '6011644859' : '9338029233'}
            data-ad-format='auto'
            data-full-width-responsive='true'
        />
    );
};

export default AdUnit;
