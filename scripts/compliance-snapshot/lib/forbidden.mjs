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
];

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
