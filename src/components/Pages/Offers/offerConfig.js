// Single source of truth for the Offer Finder (Page 1) + Offer Wall (Page 2).
// Phase 1 drives the UI entirely from this module. Phase 3 swaps MOCK_OFFERS /
// fallbackCount for live GraphQL data behind the same shapes, so components
// never change. Keep offer objects shaped like the GraphQL/redirect layer
// expects: { id, title, description, partner_url, link_shape }.

// --- Categories (canonical render order) ----------------------------------
// `key`         URL/query token + section anchor id
// `pathKey`     co-reg path_key passed to fetchCoRegPathByKey (Phase 3).
//               EMPTY until the real keys are supplied — empty falls back to MOCK_OFFERS.
// `fallbackCount` count shown on Page 1 + section header until live data exists
export const CATEGORIES = [
    {
        key: 'loans',
        label: 'I need a loan',
        sublabel: 'Personal loan opportunities',
        navLabel: 'Loans',
        icon: '💵',
        sectionTitle: 'Loan Offers',
        sectionSub: 'Personal loan and cash-access options.',
        offerGroup: 'loans',
        pathKey: 'usc_loans',
        valueKey: 'loans', // key in getCoRegPathValues.body
        fallbackCount: 24,
        ctaShowMore: 'Show More Loan Offers ↓',
    },
    {
        key: 'credit',
        label: 'I want better credit',
        sublabel: 'Credit building opportunities',
        navLabel: 'Credit',
        icon: '📈',
        sectionTitle: 'Credit Improvement Offers',
        sectionSub: 'Credit-building tools, monitoring, and score support.',
        offerGroup: 'credit',
        pathKey: 'usc_cred_improvement',
        valueKey: 'cred_improvement', // key in getCoRegPathValues.body
        fallbackCount: 31,
        ctaShowMore: 'Show More Credit Offers ↓',
    },
    {
        key: 'savings',
        label: 'I want to save money',
        sublabel: 'Savings and bill reduction offers',
        navLabel: 'Savings',
        icon: '💰',
        sectionTitle: 'Savings Offers',
        sectionSub: 'Offers that may help you save money or earn more on deposits.',
        offerGroup: 'savings',
        pathKey: 'usc_savings',
        valueKey: 'savings', // key in getCoRegPathValues.body
        fallbackCount: 18,
        ctaShowMore: 'Show More Savings Offers ↓',
    },
    {
        key: 'income',
        label: 'I want passive income',
        sublabel: 'Income-focused opportunities',
        navLabel: 'Income',
        icon: '🏠',
        sectionTitle: 'Passive Income Offers',
        sectionSub: 'Income-focused opportunities and programs.',
        offerGroup: 'income',
        pathKey: 'usc_passive',
        valueKey: 'passive', // key in getCoRegPathValues.body
        fallbackCount: 12,
        ctaShowMore: 'Show More Income Offers ↓',
    },
];

export const CATEGORY_KEYS = CATEGORIES.map(c => c.key);
export const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => { acc[c.key] = c; return acc; }, {});

// Total used by the desktop-only "Show me everything" option on Page 1.
export const TOTAL_COUNT = CATEGORIES.reduce((sum, c) => sum + c.fallbackCount, 0);

// Page 1 option list. The "all" option is hidden on mobile via CSS.
export const FINDER_OPTIONS = CATEGORIES.map(c => ({
    key: c.key,
    label: c.label,
    sublabel: c.sublabel,
    icon: c.icon,
    count: c.fallbackCount,
}));

// --- Recommendation badges (brief §6.2 / §6.3) ----------------------------
// Assigned to the top 3 offers per category by position.
export const BADGES = [
    { cls: 'editor', label: "🏆 Editor's Choice" },
    { cls: 'trending', label: '🔥 Trending Now' },
    { cls: 'best', label: '⭐ Best Overall' },
];

export const assignBadge = (index) => (index < BADGES.length ? BADGES[index] : null);

// --- Pills (brief §7) ------------------------------------------------------
export const PILL_BANK = [
    'Popular', 'Recommended', 'Top Pick', 'Easy Start', 'Trusted Partner',
    'Quick Review', 'Bonus Potential', 'High Value', 'Featured',
    'Visitor Favorite', 'Worth Exploring', 'Limited Time',
];

// Rotating color classes (map to .module.css pill color classes).
export const PILL_COLORS = ['g', 'b', 'y', 'p'];

// Deterministic so an offer always shows the same pills (brief §7.3).
export const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const getOfferPills = (offerId, count = 3) => {
    const id = Number(offerId) || String(offerId).length;
    const pills = [...PILL_BANK];
    pills.sort((a, b) => seededRandom(id + a.length) - seededRandom(id + b.length));
    return pills.slice(0, count).map((label, i) => ({
        label,
        color: PILL_COLORS[i % PILL_COLORS.length],
    }));
};

// --- Mock offers (Phase 1; replaced by live data in Phase 3) --------------
// partner_url is a placeholder; Phase 2 shapes it via buildLinkout + pixels.
export const MOCK_OFFERS = {
    loans: [
        { id: 1001, title: 'Personal Loan Matching Network', description: 'Compare multiple loan providers with a single request.', partner_url: 'https://example.com/offer/1001', link_shape: 'default' },
        { id: 1002, title: 'Bad Credit Loan Marketplace', description: 'Browse lending partners that may consider a wide range of credit profiles.', partner_url: 'https://example.com/offer/1002', link_shape: 'default' },
        { id: 1003, title: 'Debt Consolidation Review', description: 'See if a consolidation option could simplify monthly payments.', partner_url: 'https://example.com/offer/1003', link_shape: 'default' },
        { id: 1004, title: 'Cash Advance Network', description: 'Explore short-term cash-access options from multiple partners.', partner_url: 'https://example.com/offer/1004', link_shape: 'default' },
        { id: 1005, title: 'Installment Loan Finder', description: 'Match with installment loan options that fit your budget.', partner_url: 'https://example.com/offer/1005', link_shape: 'default' },
    ],
    credit: [
        { id: 2001, title: 'Credit Builder Account', description: 'Build positive payment history with a guided credit-building program.', partner_url: 'https://example.com/offer/2001', link_shape: 'default' },
        { id: 2002, title: 'Credit Monitoring Service', description: 'Track alerts, score updates, and important report changes.', partner_url: 'https://example.com/offer/2002', link_shape: 'default' },
        { id: 2003, title: 'Secured Credit Card Option', description: 'Explore card options designed for building or rebuilding credit.', partner_url: 'https://example.com/offer/2003', link_shape: 'default' },
        { id: 2004, title: 'Score Improvement Toolkit', description: 'Tools and guidance to help raise your credit score over time.', partner_url: 'https://example.com/offer/2004', link_shape: 'default' },
    ],
    savings: [
        { id: 3001, title: 'Bill Savings Review', description: 'Check opportunities to reduce recurring monthly bills.', partner_url: 'https://example.com/offer/3001', link_shape: 'default' },
        { id: 3002, title: 'High-Yield Savings Match', description: 'Compare savings accounts designed to help your money earn more.', partner_url: 'https://example.com/offer/3002', link_shape: 'default' },
        { id: 3003, title: 'Lower Your Phone Bill', description: 'Compare options that may reduce your monthly wireless bill.', partner_url: 'https://example.com/offer/3003', link_shape: 'default' },
        { id: 3004, title: 'Insurance Comparison', description: 'Compare quotes that may lower your monthly premiums.', partner_url: 'https://example.com/offer/3004', link_shape: 'default' },
    ],
    income: [
        { id: 4001, title: 'Cash Back App', description: 'Earn rewards while shopping through participating merchants.', partner_url: 'https://example.com/offer/4001', link_shape: 'default' },
        { id: 4002, title: 'Paid Survey Program', description: 'Share opinions and explore paid survey opportunities.', partner_url: 'https://example.com/offer/4002', link_shape: 'default' },
        { id: 4003, title: 'Cash Rewards Marketplace', description: 'Explore reward programs for completing online actions.', partner_url: 'https://example.com/offer/4003', link_shape: 'default' },
    ],
};

// --- Other Opportunities cross-sell (brief §8) ----------------------------
export const OTHER_OPPORTUNITIES = [
    { id: 9001, icon: '⭐', title: 'Featured Opportunity', description: 'Explore a limited-time financial offer selected from our partner marketplace.', partner_url: 'https://example.com/offer/9001', link_shape: 'default' },
    { id: 9002, icon: '✚', title: 'Partner Offer', description: 'Review a high-performing partner offer that may help you save or earn more.', partner_url: 'https://example.com/offer/9002', link_shape: 'default' },
    { id: 9003, icon: '✓', title: 'Recommended Option', description: 'See another opportunity our visitors frequently explore after viewing matches.', partner_url: 'https://example.com/offer/9003', link_shape: 'default' },
];

// Returns up to N offers for a category (mock now, live in Phase 3).
export const getOffersByCategory = (key) => MOCK_OFFERS[key] || [];

// Parse + validate the ?categories= token into known category keys (canonical order).
export const parseCategories = (raw) => {
    const requested = (raw || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    return CATEGORY_KEYS.filter(k => requested.includes(k));
};
