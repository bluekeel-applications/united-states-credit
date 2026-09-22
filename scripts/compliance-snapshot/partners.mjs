// The Marketplace Partners list, fetched at build time from the same endpoint
// the live page reads (services.config.js marketplacePartnersEndpoint) with
// the same validity rule the live component applies. Unavailable is a state
// the snapshot records and renders with the live page's own words — never a
// list that looks current.
import { fetchJson } from './lib/http.mjs';

export const loadPartners = async ({ endpoint, retries = 3 }) => {
    if (!endpoint) return { status: 'unavailable_at_build', phase: 'unavailable', list: null, error: 'no endpoint for this host' };
    try {
        const { json: list } = await fetchJson(endpoint, { retries, timeoutMs: 10000 });
        if (!Array.isArray(list?.partners)) return { status: 'unavailable_at_build', phase: 'unavailable', list: null, error: 'response carried no partners array' };
        return { status: 'loaded', phase: 'loaded', list, error: null };
    } catch (error) {
        return { status: 'unavailable_at_build', phase: 'unavailable', list: null, error: String(error?.message || error) };
    }
};
