// The /loans page registry as the verifier reads it: straight from the
// source text of loanPages.js, independently of the bundle the prerender
// used, so the check does not share the prerender's view of the registry.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const REGISTRY_FILE = 'src/components/Pages/LoanWrapper/loanPages.js';

export const readRegistry = (root) => {
    const src = readFileSync(resolve(root, REGISTRY_FILE), 'utf8');
    const slugs = [...src.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
    const legacy = {};
    const legacyBlock = src.match(/LEGACY_SLUGS\s*=\s*\{([\s\S]*?)\}/);
    if (legacyBlock) for (const m of legacyBlock[1].matchAll(/'([a-z0-9-]+)'\s*:\s*'([a-z0-9-]+)'/g)) legacy[m[1]] = m[2];
    const marketingVersion = src.match(/MARKETING_PARTNERS\s*=\s*\{[\s\S]*?version:\s*'([^']+)'/)?.[1] || null;
    const contentVersion = src.match(/LEGAL_CONTENT_VERSION\s*=\s*'([^']+)'/)?.[1] || null;
    const titles = Object.fromEntries([...src.matchAll(/slug:\s*'([a-z0-9-]+)'[\s\S]*?documentTitle:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]));
    return { slugs, legacy, marketingVersion, contentVersion, titles };
};

// The documents the spec (§6) names as the minimum, by the slugs the site
// gives them — a floor that holds even if the registry were emptied.
export const SPEC_MINIMUM = [
    'legal-center', 'privacy-policy', 'terms', 'e-consent', 'rates-and-fees', 'lending-policy', 'advertiser-disclosure',
    'financial-privacy-notice', 'california-financial-privacy', 'marketing-communications', 'state-privacy-rights',
    'privacy-choices', 'cookies-tracking', 'notice-at-collection', 'fcra-authorization',
];
