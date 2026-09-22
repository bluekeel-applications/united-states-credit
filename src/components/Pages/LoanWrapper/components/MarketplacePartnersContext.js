import { createContext } from 'react';

// A Marketplace Partners list fetched ahead of render — { phase: 'loaded' |
// 'unavailable', list } — for a render with no browser to fetch from: the
// compliance snapshot builds it from the same endpoint the live page reads
// (services.config.js) and provides it here. The live page never provides it
// and fetches for itself.
export const MarketplacePartnersContext = createContext(undefined);
