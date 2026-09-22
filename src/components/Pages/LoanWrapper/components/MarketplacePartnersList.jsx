import React, { useContext, useEffect, useState } from 'react';
import { P, Ul, Li, H3, Table } from './Copy';
import Styles from './LegalPageLayout.css';
import { marketplacePartnersEndpoint } from '../services.config';
import { MarketplacePartnersContext } from './MarketplacePartnersContext';

// The Marketplace Partners list, read from the marketplace-partners service
// (APIS/bluekeel-tools) which pulls Affiliate ROI's GetMarketplacePartners
// daily and keeps every version. Nothing here is written by hand: a host with
// no endpoint, a failed request or a 503 shows an "unavailable" state and
// never a list that looks current.

// What the page says when there is no list to show.
export const PartnersUnavailable = () => (
    <div style={Styles.formResult} role='status'>
        <strong>The partner list is temporarily unavailable.</strong> It is refreshed from our partners' records every day; please check back shortly. The companies involved in a particular request are also disclosed by the lender that responds to it.
    </div>
);

// The list as the service returns it: the version and date line, the
// platforms that receive requests, the table of marketplace partners. The
// compliance snapshot renders this with the list it fetched at build time.
export const PartnersListView = ({ list }) => {
    const updated = list.updated_at ? new Date(list.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
    const direct = list.direct?.partners || [];

    return (
        <>
            <P><strong>List version {list.version}{updated ? ` · Last updated ${updated}` : ''}.</strong>{list.stale ? ' This list could not be refreshed in the last two days; the most recent confirmed list is shown.' : ''}</P>
            {direct.length > 0 && (
                <>
                    <H3>Lending platforms and networks that receive requests from UnitedStatesCredit</H3>
                    <Ul>
                        {direct.map((partner) => (
                            <Li key={partner.name}><strong>{partner.name}</strong>{partner.role ? ` — ${partner.role}` : ''}</Li>
                        ))}
                    </Ul>
                </>
            )}
            <H3>Marketplace partners that may evaluate or respond to a request ({list.count})</H3>
            <Table
                head={['Company', 'License number']}
                rows={list.partners.map((partner) => [partner.name, partner.license || '—'])}
            />
        </>
    );
};

const MarketplacePartnersList = () => {
    const endpoint = marketplacePartnersEndpoint();
    // A render with no browser (the compliance snapshot) provides the list it
    // fetched from the same endpoint; the live page fetches for itself.
    const provided = useContext(MarketplacePartnersContext);
    const [state, setState] = useState(provided || { phase: endpoint ? 'loading' : 'unavailable', list: null });

    useEffect(() => {
        if (provided || !endpoint) return undefined;
        let cancelled = false;
        fetch(endpoint, { headers: { Accept: 'application/json' } })
            .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
            .then((list) => { if (!cancelled && Array.isArray(list.partners)) setState({ phase: 'loaded', list }); else if (!cancelled) setState({ phase: 'unavailable', list: null }); })
            .catch(() => { if (!cancelled) setState({ phase: 'unavailable', list: null }); });
        return () => { cancelled = true; };
    }, [endpoint, provided]);

    if (state.phase === 'loading') {
        return <P role='status'>Loading the current list…</P>;
    }
    if (state.phase === 'unavailable') {
        return <PartnersUnavailable />;
    }
    return <PartnersListView list={state.list} />;
};

export default MarketplacePartnersList;
