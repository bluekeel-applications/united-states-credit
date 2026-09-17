// Where Bluekeel's own form (bkform, ../../APIS/bluekeel-tools/bkform) loads
// from and posts to, decided per host. /loans always renders bkform; there is
// no longer a third-party form or a URL switch.
//
// Two target sets. The routing engine's dev stage is the certification
// environment (every buyer is called on its test endpoint), so a real visitor
// must never reach it: only the hosts listed in DEV_HOSTS get the dev targets,
// and every other host — www, the apex, and the white-label buckets that ship
// this same build — gets production. Unknown host → production is the
// fail-safe direction.
//
// `firstOfferCheck` is bkform's data-first-offer-check: 'on' posts the short
// form to the first-look buyer (Search ROI) before the remaining questions,
// 'off' runs one continuous form. On for staging since 2026-09-17, when Search
// ROI's account values arrived and certification began; off on production
// until they approve the account for live leads.
//
// The site key is the same on both stages; it is registered per stage in the
// engine (`yarn bootstrap-config --stage <stage> --site unitedstatescredit.com
// --origin …`) and is what the Bluekeel console shows as the lead's source.
const DEV_HOSTS = ['staging.unitedstatescredit.com', 'localhost', '127.0.0.1'];

const DEV = {
    dev: true,
    src: 'https://bkform-dev.s3.amazonaws.com/v1/form.js',
    apiBase: 'https://lq97621kpg.execute-api.us-east-1.amazonaws.com/dev',
    consoleBase: 'https://d17du2okjziban.cloudfront.net',
    firstOfferCheck: 'on',
};

const PROD = {
    dev: false,
    src: 'https://form-sdk.unitedstatescredit.com/v1/form.js',
    apiBase: 'https://16s3asw7j0.execute-api.us-east-1.amazonaws.com/prod',
    consoleBase: 'https://d1bg0h8m65e3si.cloudfront.net',
    firstOfferCheck: 'off',
};

export const BKFORM_SITE_KEY = 'unitedstatescredit.com';
export const BKFORM_CONTAINER_ID = 'bk-form';

// The SDK URL, lead API and Bluekeel console for the host the page is served
// from. REACT_APP_BKFORM_API_BASE overrides the API for local development
// (e.g. an engine running on `sls offline`).
export const bkformTargets = (hostname) => {
    const targets = DEV_HOSTS.includes(hostname) ? DEV : PROD;
    const apiBase = process.env.REACT_APP_BKFORM_API_BASE || targets.apiBase;
    return { ...targets, apiBase };
};
