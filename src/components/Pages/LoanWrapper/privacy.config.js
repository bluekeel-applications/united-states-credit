// Where the Your Privacy Choices form posts a privacy request, per host — the
// same split as bkform.config.js. The intake is the privacy-requests service in
// APIS/bluekeel-tools (contract: its src/reference/PRIVACY_REQUESTS.md).
//
// A host with no endpoint shows the email route instead of the form: a form
// that cannot durably record a request must not be offered. Production stays
// on email until the service's prod stage is deployed and its URL is set here.
const DEV_HOSTS = ['staging.unitedstatescredit.com', 'localhost', '127.0.0.1'];

// privacy-requests dev stage (deployed 2026-09-17). It answers only to the DEV_HOSTS origins.
const DEV = { endpoint: 'https://n928g1nsuc.execute-api.us-east-1.amazonaws.com/dev/privacy-request' };

const PROD = { endpoint: null };

export const privacyRequestEndpoint = (hostname = window.location.hostname) =>
    process.env.REACT_APP_PRIVACY_REQUEST_ENDPOINT || (DEV_HOSTS.includes(hostname) ? DEV : PROD).endpoint;
