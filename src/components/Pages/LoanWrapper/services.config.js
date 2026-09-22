// The Bluekeel services the /loans pages talk to, per host — the same split as
// bkform.config.js. Both live in APIS/bluekeel-tools:
//
//   privacy-requests     the Your Privacy Choices form posts here
//                        (contract: its src/reference/PRIVACY_REQUESTS.md)
//   marketplace-partners the Marketplace Partners page reads the current list
//                        here (src/reference/MARKETPLACE_PARTNERS.md)
//
// A host with no endpoint degrades honestly: the privacy page shows the email
// route instead of the form, the partners page says the list is unavailable.
// Production stays empty until each service's prod stage is deployed and its
// URL is set here.
const DEV_HOSTS = ['staging.unitedstatescredit.com', 'localhost', '127.0.0.1'];

const DEV = {
    // privacy-requests dev stage (deployed 2026-09-17). Answers only to the DEV_HOSTS origins.
    privacyRequest: 'https://n928g1nsuc.execute-api.us-east-1.amazonaws.com/dev/privacy-request',
    // marketplace-partners dev stage (deployed 2026-09-18; first pull the same day).
    marketplacePartners: 'https://b35i57ojg0.execute-api.us-east-1.amazonaws.com/dev/marketplace-partners',
};

// Both prod stages deployed 2026-09-21; they answer only to the www and apex origins.
const PROD = {
    privacyRequest: 'https://m9ard1uzaa.execute-api.us-east-1.amazonaws.com/prod/privacy-request',
    marketplacePartners: 'https://luyu5pvptg.execute-api.us-east-1.amazonaws.com/prod/marketplace-partners',
};

export const isDevHost = (hostname) => DEV_HOSTS.includes(hostname);

const targets = (hostname) => (isDevHost(hostname) ? DEV : PROD);

// In the browser the host is the page's own. A render with no browser — the
// compliance snapshot, built for one named host — says which host it is for
// before it renders anything; nothing in the live app calls this.
let hostnameOverride = null;
export const configureServicesHost = (hostname) => { hostnameOverride = hostname || null; };
const currentHostname = () => hostnameOverride ?? window.location.hostname;

export const privacyRequestEndpoint = (hostname = currentHostname()) =>
    process.env.REACT_APP_PRIVACY_REQUEST_ENDPOINT || targets(hostname).privacyRequest;

export const marketplacePartnersEndpoint = (hostname = currentHostname()) =>
    process.env.REACT_APP_MARKETPLACE_PARTNERS_ENDPOINT || targets(hostname).marketplacePartners;
