import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { COREG_PATH } from '../GraphQL/queries';
import { CATEGORY_MAP, MOCK_OFFERS } from '../../components/Pages/Offers/offerConfig';
import { normalizeCoRegPathItems } from '../coRegOffers';

// Phase 3 (hybrid): one co-reg path per category via fetchCoRegPathByKey.
// Each path_item becomes one offer card; the displayed base_offer is chosen by
// usage weighting (mirrors findOfferUrl in ButtonGroupPage). base_offer gives
// live name/description/offer_url/link_shape — badges/pills/order stay client-side.
// Falls back to MOCK_OFFERS whenever a path key is missing, empty, or errors.

const useOffersByCategories = (categoryKeys) => {
    const client = useApolloClient();
    const [ offersByCategory, setOffersByCategory ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const keyString = categoryKeys.join(',');

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setLoading(true);
            const result = {};

            await Promise.all(categoryKeys.map(async (key) => {
                const cat = CATEGORY_MAP[key];
                const fallback = MOCK_OFFERS[key] || [];
                const pathKey = cat && cat.pathKey;
                if (!pathKey) { result[key] = fallback; return; }
                try {
                    const { data } = await client.query({
                        query: COREG_PATH,
                        variables: { key: pathKey },
                        fetchPolicy: 'cache-first',
                        errorPolicy: 'all',
                    });
                    const body = data && data.fetchCoRegPathByKey && data.fetchCoRegPathByKey.body;
                    const normalized = normalizeCoRegPathItems(body && body.path_items, key);
                    result[key] = normalized.length ? normalized : fallback;
                } catch (e) {
                    result[key] = fallback;
                }
            }));

            if (!cancelled) {
                setOffersByCategory(result);
                setLoading(false);
            }
        };

        run();
        return () => { cancelled = true; };
        // eslint-disable-next-line
    }, [keyString]);

    return { offersByCategory, loading };
};

export default useOffersByCategories;
