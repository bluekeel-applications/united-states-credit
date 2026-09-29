// What must never be in a published snapshot (tier 1 fails the deploy) and
// what a human should glance at (tier 2 warns with context).
export const TIER1 = [
    ['AWS access key', /\b(AKIA|ASIA)[0-9A-Z]{16}\b/],
    ['AWS secret key name', /aws_secret_access_key|secret_access_key/i],
    ['private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
    ['pull/API key header', /x-pull-key|x-api-key/i],
    ['bkform API/console base', /\b(apiBase|consoleBase)\b|data-api-base|data-console-base/],
    ['API Gateway host', /execute-api\.[a-z0-9-]+\.amazonaws\.com/i],
    ['CloudFront host', /[a-z0-9]+\.cloudfront\.net/i],
    ['S3 host', /\.s3\.amazonaws\.com|s3-website/i],
    ['Stripe/GitHub/JWT/bearer token shape', /\bsk_(live|test)_[0-9a-zA-Z]{8,}|\bghp_[0-9A-Za-z]{20,}|\beyJ[\w-]{20,}\.eyJ|Bearer [\w.-]{16,}/],
    ['credential assignment', /(api[_-]?key|apikey|secret|password|token)\s*[:=]\s*['"][^'"]{8,}['"]/i],
    ['source map reference', /sourceMappingURL/],
    ['retired internal phrase', /must be connected to this preference|preferred production method|pending legal review|Developer preview|wire this form|backend needs connecting|\bDEVIATION\b|Implementation note/],
    // UnitedStatesCredit.com is a site Bluekeel LLC operates, not a registered
    // assumed name (final compliance cleanup, 2026-09-29, § 5): nothing current
    // may call it a "d/b/a" — B10 scans every page and the JSON for it (B20).
    // About our own name only: a Marketplace Partner's name may carry a trade
    // name of its own ("… dba …"), and that list is published as it is given.
    ['"d/b/a" identity wording', /(\bd\/b\/a|\bdba|\bdoing business as)\s+(the\s+)?United\s?States\s?Credit|Bluekeel,? LLC,?\s+(d\/b\/a|dba|doing business as)\b/i],
];

// The final compliance cleanup (2026-09-29), as the verifier holds it.
// RETIRED_DIRECTORY: the separate directory of promotional senders — its page,
// its list, its version and every link to it are gone; the old URL redirects
// (loanPages.js LEGACY_SLUGS). CONSENT_WORDING: what the two optional marketing
// consents must not say (§ 1, "Explicit exclusions"), what they must say, and
// the version of every consent wording in force — a changed wording in bkform
// has to be met by a changed version here, deliberately.
export const RETIRED_DIRECTORY = {
    slug: 'marketing-partners',
    redirectsTo: 'marketing-communications',
    name: /Marketing Partners/,
    field: /marketingPartners|marketing_partners|marketing-partners-version/i,
};
export const CONSENT_WORDING = {
    marketingConsents: ['consentContact', 'consentMobile'],
    excluded: [/artificial/i, /prerecorded/i, /\bd\/b\/a\b/i, /\bdba\b/i, /Marketing Partners/i],
    identity: 'Bluekeel LLC, operator of UnitedStatesCredit.com',
    links: { consentContact: ['marketplace-partners', 'marketing-communications'], consentMobile: ['marketplace-partners'] },
    versions: { consentContact: 'contact-2026-09-29', consentFcra: 'fcra-2026-09-18', consentMobile: 'mobile-2026-09-29', caAuthorization: 'ca-auth-2026-09-18' },
};

export const UNFINISHED = /\b(TBD|TODO|FIXME)\b|\[PLACEHOLDER\]|lorem ipsum/i;

export const TIER2 = /payout|rev[- ]?share|\bbids?\b|bid floor|\bcpl\b|\bcpa\b|routing (weight|rule|order|priority)|fraud (rule|score)|threshold|\bbuyers?\b|Search ROI|Market Bullet|RoundSky|Round Sky|Affiliate ROI|ping tree|waterfall|certification|BUYER_TARGET|TestBanner|hostile|do not publish/i;

// Applicant-shaped data. Hex hashes are exempt from the long-digit rule.
export const APPLICANT = [
    ['SSN shape', /\b\d{3}-\d{2}-\d{4}\b/],
    ['phone shape', /\(\d{3}\) \d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b/],
    ['9+ digit run', /(?<![0-9a-fA-F])\d{9,}(?![0-9a-fA-F])/],
];
export const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
export const EMAIL_ALLOWED = (address) => /^info@bluekeel\.com$/i.test(address) || /@example\.(test|com|org|invalid)$/i.test(address);
