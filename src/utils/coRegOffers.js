import { CATEGORY_MAP } from '../components/Pages/Offers/offerConfig';

// Shared helpers for turning a co-reg path (fetchCoRegPathByKey) into the card
// shape Phase 1 components consume. Used by both the per-category offers hook
// and the Other Opportunities cross-sell so they normalize identically.

// Stable numeric id from the offer's identity — base_offer has no id, but pills
// (getOfferPills) and React keys need a deterministic seed.
export const hashId = (str) => {
    let h = 0;
    const s = String(str || '');
    for (let i = 0; i < s.length; i += 1) {
        h = (h * 31 + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
};

// Weighted pick across a path_item's offers (cumulative usage vs 1..100),
// matching the existing ButtonGroupPage.findOfferUrl behavior.
export const pickByUsage = (offers) => {
    if (!offers || !offers.length) return null;
    const total = offers.reduce((sum, o) => sum + (Number(o.usage) || 0), 0);
    if (total <= 0) return offers[0];
    const r = Math.floor(Math.random() * 100) + 1;
    let cumulative = 0;
    for (let i = 0; i < offers.length; i += 1) {
        cumulative += Number(offers[i].usage) || 0;
        if (r <= cumulative) return offers[i];
    }
    return offers[offers.length - 1];
};

// path_items → card shape. One card per item; base_offer chosen by usage weight.
// item_name = main label, item_question_text = sublabel (with fallbacks).
export const normalizeCoRegPathItems = (pathItems, categoryKey) =>
    (pathItems || [])
        .map((item) => {
            const chosen = pickByUsage(item.offers);
            const base = chosen && chosen.base_offer;
            if (!base || !base.offer_url) return null;
            const cat = CATEGORY_MAP[categoryKey];
            return {
                id: hashId(`${base.name}|${base.offer_url}`),
                title: item.item_name || base.name || 'Offer',
                description: item.item_question_text || base.description || (cat && cat.sectionSub) || '',
                partner_url: base.offer_url,
                link_shape: base.link_shape || 'default',
                category: categoryKey,
            };
        })
        .filter(Boolean);
