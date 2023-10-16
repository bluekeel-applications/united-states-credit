import { useEffect } from 'react';
import { ADD_QUERY_INSIGHT, INSERT_SEARCH_INFO }from '../GraphQL/mutations';
import { useMutation } from '@apollo/client';

const useInsightSubmit = (query, tracking, shouldExecute) => {

	const {  hsid, oid, eid, sid, uid, ip_address } = tracking;

    const [ insertSearchInfo ] = useMutation(INSERT_SEARCH_INFO, { 
        onCompleted: () => console.log('SearchInfo posted to CF.') 
    });

    const [ addQueryInsight ] = useMutation(ADD_QUERY_INSIGHT, { 
        onCompleted: () => console.log('QueryInsight posted to Mongo.') 
    });

	useEffect(() => {
        if(shouldExecute) {
            insertSearchInfo({
                variables: {
                    visitor: {
                        'hsid': Number(hsid),
                        'oid': Number(oid),
                        'eid': eid,
                        'sid': Number(sid),
                        'uid': uid,
                        'ip_address': ip_address,
                        'query': query
                    }
                }
            });
            addQueryInsight({ 
                variables: { 
                    clickId: Number(hsid), 
                    query: query
                } 
            })
        }
		// eslint-disable-next-line
	}, [shouldExecute]);

	return;
};

export default useInsightSubmit;