import { useQuery } from '@apollo/client';
import { COREG_PATH_VALUES } from '../GraphQL/queries';
import { CATEGORIES } from '../../components/Pages/Offers/offerConfig';

// Live per-category offer counts from getCoRegPathValues (no args). Maps the
// response body (keyed by valueKey: loans / credit_improvement / savings /
// passive) onto our category keys. Falls back to each category's fallbackCount
// when the value is missing or the query errors, so counts are always defined.
// cache-first so Page 1 and Page 2 share a single fetch within the session.
const useCoRegPathValues = () => {
    const { data, loading } = useQuery(COREG_PATH_VALUES, {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
    });

    const res = data && data.getCoRegPathValues;
    const body = res && res.success ? res.body : null;

    const counts = {};
    CATEGORIES.forEach((c) => {
        const v = body ? body[c.valueKey] : undefined;
        counts[c.key] = typeof v === 'number' ? v : c.fallbackCount;
    });

    return { counts, loading };
};

export default useCoRegPathValues;
