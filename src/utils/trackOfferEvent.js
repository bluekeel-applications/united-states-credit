// Thin GA4 wrapper for offer-funnel analytics (Phase 4). Sends events through
// the live gtag tag (G-20MVF1Z2ML). No-ops safely if gtag is absent (blocked,
// or not yet loaded) and never throws — analytics must not break the funnel.
// `device_type` is added automatically; callers pass event-specific metadata.
const getDeviceType = () => {
    if (typeof window === 'undefined') return 'unknown';
    return window.innerWidth <= 900 ? 'mobile' : 'desktop';
};

const trackOfferEvent = (name, params = {}) => {
    try {
        if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
        window.gtag('event', name, { device_type: getDeviceType(), ...params });
    } catch (e) {
        /* swallow — analytics is best-effort */
    }
};

export default trackOfferEvent;
