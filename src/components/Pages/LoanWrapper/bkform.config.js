// Where Bluekeel's own form (bkform, ../../APIS/bluekeel-tools/bkform) loads
// from and posts to, and where the `?form=bk` switch on /loans is honoured.
//
// TEST CONFIGURATION (2026-09-08). Everything here points at the routing
// engine's dev stage, which is the certification environment: every buyer is
// called on its test endpoint (Round Sky forces the outcome by first name —
// `approved` / `declined` / `pricereject`). Because of that the switch is
// host-gated: on any host not listed below `?form=bk` is ignored and the page
// shows the usual third-party form, so a prod visitor can never post a
// certification lead. Going live means changing all four constants together:
//   - BKFORM_SRC        → the prod CDN URL (bkform's deploy-prod runbook)
//   - BKFORM_API_BASE   → the prod routing-engine API
//   - BKFORM_CONSOLE_BASE → the prod console
//   - BKFORM_HOSTS      → add www.unitedstatescredit.com / unitedstatescredit.com
//   - the site key stays: it is registered per stage in the engine's config
//     (`yarn bootstrap-config --site unitedstatescredit.com --origin …`) and is
//     what the Bluekeel console shows as the lead's source.
export const BKFORM_SRC = 'https://bkform-dev.s3.amazonaws.com/v1/form.js';
export const BKFORM_API_BASE = process.env.REACT_APP_BKFORM_API_BASE
    || 'https://lq97621kpg.execute-api.us-east-1.amazonaws.com/dev';
export const BKFORM_SITE_KEY = 'unitedstatescredit.com';
// The Bluekeel console for this engine — bkform's single-lender test mode
// (?form=bk&test=<lender>) prints a link to the lead there.
export const BKFORM_CONSOLE_BASE = 'https://d17du2okjziban.cloudfront.net';
export const BKFORM_CONTAINER_ID = 'bk-form';
export const BKFORM_HOSTS = ['staging.unitedstatescredit.com', 'localhost', '127.0.0.1'];

// `?form=bk` on an allowed host. Anything else → the third-party form.
export const bkFormEnabled = (search, hostname) =>
    new URLSearchParams(search).get('form') === 'bk' && BKFORM_HOSTS.includes(hostname);
