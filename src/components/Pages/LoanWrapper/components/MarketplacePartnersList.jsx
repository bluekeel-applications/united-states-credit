import React, { useEffect, useState } from 'react';
import { P, Ul, Li, H3, Table } from './Copy';
import Styles from './LegalPageLayout.css';
import { marketplacePartnersEndpoint } from '../services.config';

// The Marketplace Partners list, read from the marketplace-partners service
// (APIS/bluekeel-tools) which pulls Affiliate ROI's GetMarketplacePartners
// daily and keeps every version. Nothing here is written by hand: a host with
// no endpoint, a failed request or a 503 shows an "unavailable" state and
// never a list that looks current.
const MarketplacePartnersList = () => {
    const endpoint = marketplacePartnersEndpoint();
    const [state, setState] = useState({ phase: endpoint ? 'loading' : 'unavailable', list: null });

    useEffect(() => {
        if (!endpoint) return undefined;
        let cancelled = false;
        fetch(endpoint, { headers: { Accept: 'application/json' } })
            .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
            .then((list) => { if (!cancelled && Array.isArray(list.partners)) setState({ phase: 'loaded', list }); else if (!cancelled) setState({ phase: 'unavailable', list: null }); })
            .catch(() => { if (!cancelled) setState({ phase: 'unavailable', list: null }); });
        return () => { cancelled = true; };
    }, [endpoint]);

    if (state.phase === 'loading') {
        return <P role='status'>Loading the current list…</P>;
    }
    if (state.phase === 'unavailable') {
        return (
            <div style={Styles.formResult} role='status'>
                <strong>The partner list is temporarily unavailable.</strong> It is refreshed from our partners' records every day; please check back shortly. The companies involved in a particular request are also disclosed by the lender that responds to it.
            </div>
        );
    }

    const { list } = state;
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

export default MarketplacePartnersList;
