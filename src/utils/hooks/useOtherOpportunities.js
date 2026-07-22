import { useQuery } from '@apollo/client';
import { COREG_PATH } from '../GraphQL/queries';
import { OTHER_OPPORTUNITIES } from '../../components/Pages/Offers/offerConfig';
import { normalizeCoRegPathItems } from '../coRegOffers';

// "Other Opportunities" cross-sell — sourced from the usc_other co-reg path,
// normalized the same way as category offers. Falls back to the static
// OTHER_OPPORTUNITIES if the path is empty or errors.
const OTHER_PATH_KEY = 'usc_other';

const useOtherOpportunities = (limit = 3) => {
    const { data, loading } = useQuery(COREG_PATH, {
        variables: { key: OTHER_PATH_KEY },
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
    });

    const res = data && data.fetchCoRegPathByKey;
    const body = res && res.success ? res.body : null;
    const normalized = normalizeCoRegPathItems(body && body.path_items, 'other').slice(0, limit);
    const offers = normalized.length ? normalized : OTHER_OPPORTUNITIES.slice(0, limit);

    return { offers, loading };
};

export default useOtherOpportunities;
